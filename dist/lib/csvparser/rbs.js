"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvparser_1 = require("../csvparser");
class RBSCSVParser extends csvparser_1.CSVParser {
    constructor() {
        super(...arguments);
        this.srcName = 'RBS';
        // XXX Unverified format - word of mouth
        this.txnMap = {
            'Date': 'txn_date',
            'Type': 'txn_type',
            'Description': 'txn_desc',
            'Value': 'txn_amount',
            'Balance': 'acc_balance',
            'Account Number': 'acc_number',
        };
    }
    parseCSVRecords(records) {
        records = super.parseCSVRecords(records);
        records.forEach(function (record) {
            record.acc_balance = +record.acc_balance;
            record.txn_amount = +record.txn_amount;
            if (record.txn_amount >= 0) {
                record.txn_amount_credit = +record.txn_amount;
                record.txn_amount_debit = 0;
            }
            else {
                record.txn_amount_debit = -1 * record.txn_amount;
                record.txn_amount_credit = 0;
            }
            delete record.txn_amount;
        }.bind(this));
        return records;
    }
}
exports.RBSCSVParser = RBSCSVParser;
//# sourceMappingURL=rbs.js.map