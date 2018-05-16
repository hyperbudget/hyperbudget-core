"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvparser_1 = require("../csvparser");
class LloydsCSVParser extends csvparser_1.CSVParser {
    constructor() {
        super(...arguments);
        this.srcName = 'Lloyds';
        this.txnMap = {
            'Transaction Date': 'txn_date',
            'Transaction Type': 'txn_type',
            'Sort Code': 'acc_sortcode',
            'Account Number': 'acc_number',
            'Transaction Description': 'txn_desc',
            'Debit Amount': 'txn_amount_debit',
            'Credit Amount': 'txn_amount_credit',
            'Balance': 'acc_balance'
        };
    }
    parseCSVRecords(records) {
        return super.parseCSVRecords(records);
    }
}
exports.LloydsCSVParser = LloydsCSVParser;
//# sourceMappingURL=lloyds.js.map