import { Category } from '../types/category';
export declare class Transaction {
    readonly identifier: string;
    readonly txn_date: Date;
    readonly txn_type: string;
    readonly acc_sortcode: string;
    readonly acc_number: string;
    readonly txn_desc: string;
    readonly txn_amount_debit: number;
    readonly txn_amount_credit: number;
    readonly txn_src: string;
    readonly acc_balance: number;
    month: string;
    readonly org_month: string;
    categories: Category[];
    [key: string]: any;
    constructor(record: {
        txn_date: string;
        txn_type?: string;
        acc_sortcode?: string;
        acc_number?: string;
        txn_desc?: string;
        txn_amount_debit?: number;
        txn_amount_credit?: number;
        txn_src?: string;
        acc_balance?: number;
        month?: string;
        org_month?: string;
        categories?: Category[];
        identifier?: string;
        [k: string]: any;
    });
    txn_amount(): number;
    private _parse_date(txn_date);
    private static _extract_date_format_based_on_source(src);
    private _build_identifier();
}
