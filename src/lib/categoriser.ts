import { Transaction } from './transaction';

import { parse_string_rules, parse_number_rules, parse_identifier_rules } from './rule/matcher';
import { Category } from '../types/category';
import { CategoryRule } from '../types/category-rule';
import { NumericMatchConfig, StringMatchConfig } from '../types/match-config';

import moment from 'moment';

export class Categoriser {
  categories: Category[];

  constructor (categories: Category[]) {
    this.categories = categories;
  }

  by_name(name: string): Category {
    let categories = this.categories;

    return categories.find((c: Category): boolean => c.name === name);
  }

  static is_internal_transfer(txn: Transaction): boolean {
    return !!txn.categories.find((cat) => cat.id === 'tfr-pers');
  }

  static transaction_matches_rule(txn: Transaction, rule: CategoryRule): boolean {
    let match: boolean = true;

    // identifier match is most important
    if (
      rule.identifier &&
      parse_identifier_rules(txn.identifier, rule.identifier)
    ) {
      return true;
    }

    ['type', 'description', 'source'].forEach((prop: string) => {
      let match_config: StringMatchConfig = rule[prop];
      if (match_config) {
        match = match && parse_string_rules(txn[prop], match_config);
      }
    });

    ['creditAmount','debitAmount'].forEach((prop: string) => {
      let match_config: NumericMatchConfig = rule[prop];

      if (match_config) {
        match = match && parse_number_rules(txn[prop], match_config);
      }
    });

    //special case for day
    if (rule['txn_day'] && txn.date) {
      let match_config: NumericMatchConfig = rule['txn_day'];

      let day: number = moment(txn.date).utc().date();
      match = match && parse_number_rules(day, match_config);
    }

    return match;
  }

  categorise(txn: Transaction): Category[] {
    let categories = this.categories;
    let matched: Category[] = [];

    categories.forEach((category) => {
      if (Categoriser.transaction_matches_rule(txn, category.category_rules)) {
        matched.push(category);

        if (category.txn_month_modifier) {
          // do we want to bring this transaction 'backwards' or 'forwards'?
          txn.calculatedMonth = moment(txn.date).utc().add(category.txn_month_modifier, 'month').format('YYYYMM');
        }
      }
    });

    return matched;
  }

  categorise_transactions(transactions: Transaction[]) : Promise<void> {
    transactions.forEach((txn: Transaction) => {
      txn.categories = this.categorise(txn);
    });

    return new Promise((resolve, reject) => resolve());
  }

}
