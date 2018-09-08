import { Transaction } from './transaction';
import { CSVParserManager } from './manager/csvparsermanager';

export type ReportOptionsType = { unique_only?: boolean };

export interface Report {
  transactions: Transaction[];
  transactions_org: Transaction[];
  transactions_pre_filter: Transaction[];
  month_filter: string;

  filter_month(month: string): void;
  reset_filter(): void;
  add_transactions(transactions: Transaction[]): void;
  apply_filter(): void;
};

class ReportImpl implements Report {
  transactions: Transaction[];
  transactions_org: Transaction[];
  transactions_pre_filter: Transaction[];
  month_filter: string;

  constructor() {
    this.transactions = [];
    this.transactions_org = [];
    this.transactions_pre_filter = [];
  }

  add_transactions(transactions: Transaction[]) {
    this.transactions_pre_filter = this.transactions_pre_filter.concat(transactions);
    this.apply_filter();
  }

  reset_filter(): void {
    this.transactions = [...this.transactions_pre_filter];
  }

  filter_month(month: string): void {
    this.month_filter = month;
    this.apply_filter();
  }

  apply_filter(): void {
    this.reset_filter();

    if(this.month_filter) {
      this.transactions_org = this.transactions.filter(txn => txn.org_month === this.month_filter);
      this.transactions = this.transactions.filter(txn => txn.month === this.month_filter);
    }
  }
}

export class ReportFactory {
  private _report: ReportImpl;
  private options: ReportOptionsType;
  private _txnSeenIdentifierMap: { [key: string]: boolean } = {};

  constructor(options?: ReportOptionsType) {
    this.options = options || {};
    this._report = new ReportImpl();
  }

  get report(): Report {
    return this._report;
  }

  set report(r) {
    this._report = r;
  }

  from_csv(csv_text: string, type: string): Promise<void> {
    return CSVParserManager.parseCSVFile(csv_text, type).then((records: any[]) => {
      return this.add_records(records);
    });
  }

  from_records(records: any[]): Promise<void> {
    return this.add_records(records);
  }

  add_records(records: any[]): Promise<void> {
    let transactions: Transaction[] = [];

    records.forEach((record: any) => {
      let txn:Transaction = new Transaction(record);

      //unique only
      if (!this.options.unique_only || !this._txnSeenIdentifierMap[txn.identifier]) {
        transactions.push(txn);
      }

      this._txnSeenIdentifierMap[txn.identifier] = true;
    });

    this.report.add_transactions(transactions);

    return new Promise((resolve, reject) => resolve());
  }
}

export default ReportFactory;
