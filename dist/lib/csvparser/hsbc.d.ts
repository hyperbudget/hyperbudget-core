import { CSVParser } from '../csvparser';
export declare class HSBCCSVParser extends CSVParser {
    protected srcName: string;
    protected txnMap: {
        'Transaction Date': string;
        'Transaction Description': string;
        'Transaction Amount': string;
    };
    protected sanitiseInput(input: string): Promise<any>;
    parseCSVRecords(records: any[]): any[];
}
