import { NumericMatchConfig, StringMatchConfig } from "./match-config";
export declare type CategoryRule = {
    txn_day?: NumericMatchConfig;
    txn_desc?: StringMatchConfig;
    txn_type?: StringMatchConfig;
    txn_src?: StringMatchConfig;
    txn_amount_debit?: NumericMatchConfig;
    txn_amount_credit?: NumericMatchConfig;
    [key: string]: any;
};
