import { CSVParser } from '../csvparser';
export declare class MidataCSVParser extends CSVParser {
    protected srcName: string;
    protected txnMap: {
        'Date': string;
        'Type': string;
        'Merchant/Description': string;
        'Debit/Credit': string;
        'Balance': string;
    };
    protected sanitiseInput(csv_filename: string): Promise<any>;
    parseCSVRecords(records: any[]): any[];
}
