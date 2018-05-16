import { CSVParser } from '../csvparser';
export declare class FairFXCorpCSVParser extends CSVParser {
    protected srcName: string;
    protected txnMap: {
        'date': string;
        'type': string;
        'pan': string;
        'description': string;
        'debit': string;
        'credit': string;
    };
    parseCSVRecords(records: any[]): any[];
}
