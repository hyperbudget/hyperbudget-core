import { CSVParser } from '../csvparser';
export declare class LloydsCSVParser extends CSVParser {
    protected srcName: string;
    protected txnMap: {
        'Transaction Date': string;
        'Transaction Type': string;
        'Sort Code': string;
        'Account Number': string;
        'Transaction Description': string;
        'Debit Amount': string;
        'Credit Amount': string;
        'Balance': string;
    };
    parseCSVRecords(records: any[]): any[];
}
