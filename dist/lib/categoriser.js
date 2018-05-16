"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matcher_1 = require("./rule/matcher");
const moment_1 = __importDefault(require("moment"));
class Categoriser {
    constructor(categories) {
        this.categories = categories;
    }
    by_name(name) {
        let categories = this.categories;
        return categories.find(function (c) { return c.name === name; });
    }
    static is_internal_transfer(txn) {
        return !!txn.categories.find((cat) => cat.id === 'tfr-pers');
    }
    static transaction_matches_rule(txn, rule) {
        let match = true;
        ['txn_type', 'txn_desc', 'txn_src'].forEach(function (prop) {
            let match_config = rule[prop];
            if (match_config) {
                match = match && matcher_1.RuleMatcher.parse_string_rules(txn[prop], match_config);
            }
        });
        ['txn_amount_credit', 'txn_amount_debit'].forEach(function (prop) {
            let match_config = rule[prop];
            if (match_config) {
                match = match && matcher_1.RuleMatcher.parse_number_rules(txn[prop], match_config);
            }
        });
        //special case for day
        if (rule['txn_day'] && txn.txn_date) {
            let match_config = rule['txn_day'];
            let day = moment_1.default(txn.txn_date).date();
            match = match && matcher_1.RuleMatcher.parse_number_rules(day, match_config);
        }
        return match;
    }
    categorise(txn) {
        let categories = this.categories;
        let matched = [];
        categories.forEach(function (category) {
            if (Categoriser.transaction_matches_rule(txn, category.category_rules)) {
                matched.push(category);
                if (category.txn_month_modifier) {
                    // do we want to bring this transaction 'backwards' or 'forwards'?
                    txn.month = moment_1.default(txn.txn_date).add(category.txn_month_modifier, 'month').format('YYYYMM');
                }
            }
        });
        return matched;
    }
    categorise_transactions(transactions) {
        if (!transactions.length) {
            throw new Error("Need to add some records first");
        }
        transactions.forEach((txn) => {
            txn.categories = this.categorise(txn);
        });
        return new Promise((resolve, reject) => resolve());
    }
}
exports.Categoriser = Categoriser;
//# sourceMappingURL=categoriser.js.map