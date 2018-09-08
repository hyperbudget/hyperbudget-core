import { CSVParser } from '../csvparser';

export class RBSCSVParser extends CSVParser {
  protected srcName = 'RBS';

  // XXX Unverified format - word of mouth
  protected txnMap =  {
    'Date'                : 'txn_date',
    'Type'                : 'txn_type',
    'Description'         : 'txn_desc',
    'Value'               : 'txn_amount',
    'Balance'             : 'acc_balance',
    'Account Number'      : 'acc_number',
  };


  parseCSVRecords(records: any[]): any {
    records = super.parseCSVRecords(records);
    records.forEach((record: any) => {
      record.acc_balance = +record.acc_balance;
      record.txn_amount  = +record.txn_amount;

      if (record.txn_amount >= 0) {
        record.txn_amount_credit = +record.txn_amount;
        record.txn_amount_debit = 0;
      } else {
        record.txn_amount_debit = -1 * record.txn_amount;
        record.txn_amount_credit = 0;
      }

      delete record.txn_amount;
    });

    return records;
  }
}
