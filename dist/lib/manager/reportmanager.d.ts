import { Transaction } from '../transaction';
import { Categoriser } from '../categoriser';
import ReportFactory from '../report';
export declare class ReportManager {
    static add_csvs(rf: ReportFactory, csvs: {
        name: string;
        type: string;
    }[], idx?: number, records?: any[]): Promise<any>;
    static generate_web_frontend_report(txns: Transaction[]): any[];
    static generate_category_amounts(categoriser: Categoriser, txns: Transaction[], org_txns: Transaction[]): {
        [key: string]: {
            total: number;
            count: number;
            id?: string;
            name: string;
            className: string;
        };
    };
    static generate_category_amounts_frontend(categoriser: Categoriser, txns: Transaction[], org_txns: Transaction[]): any;
    static generate_monthly_breakdown(txns: Transaction[], months: string[]): {
        [k: string]: {
            in: number;
            main_in: number;
            out: number;
            gains: number;
            main_gains: number;
            running: number;
            running_main: number;
        };
    };
    static generate_monthly_breakdown_frontend(txns: Transaction[], months: string[]): {
        month: string;
        in: string;
        out: string;
        gains: string;
        main_in: string;
        main_gains: string;
        running: string;
        running_main: string;
    }[];
}
