import { CSVParser } from '../csvparser';
export declare class RBSCSVParser extends CSVParser {
    protected srcName: string;
    protected txnMap: {
        'Date': string;
        'Type': string;
        'Description': string;
        'Value': string;
        'Balance': string;
        'Account Number': string;
    };
    parseCSVRecords(records: any[]): any;
}
