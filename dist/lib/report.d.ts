import { Transaction } from './transaction';
export declare type ReportOptionsType = {
    unique_only?: boolean;
};
export interface Report {
    transactions: Transaction[];
    transactions_org: Transaction[];
    filter_month(month: string): void;
}
export declare class ReportFactory {
    private _report;
    private options;
    constructor(options?: ReportOptionsType);
    report: Report;
    from_csv(csv_text: string, type: string): Promise<void>;
    from_records(records: any): Promise<void>;
    add_records(records: any): Promise<void>;
}
export default ReportFactory;
