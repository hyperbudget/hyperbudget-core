import { Transaction } from './transaction';
import { Category } from '../types/category';
import { CategoryRule } from '../types/category-rule';
export declare class Categoriser {
    categories: Category[];
    constructor(categories: Category[]);
    by_name(name: string): Category;
    static is_internal_transfer(txn: Transaction): boolean;
    static transaction_matches_rule(txn: Transaction, rule: CategoryRule): boolean;
    categorise(txn: Transaction): Category[];
    categorise_transactions(transactions: Transaction[]): Promise<void>;
}
