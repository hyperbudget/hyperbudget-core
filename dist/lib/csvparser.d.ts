export declare class CSVParser {
    protected txnMap: {};
    protected srcName: string;
    parseCSVRecords(records: any[]): any[];
    parseCSVFile(input: string): Promise<any>;
    protected sanitiseInput(input: string): Promise<any>;
}
