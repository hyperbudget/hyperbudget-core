"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvparser_1 = require("../csvparser");
const hsbc_1 = require("../consts/transactiontypes/hsbc");
class HSBCCSVParser extends csvparser_1.CSVParser {
    constructor() {
        super(...arguments);
        this.srcName = 'HSBC';
        this.txnMap = {
            'Transaction Date': 'txn_date',
            'Transaction Description': 'txn_desc',
            'Transaction Amount': 'txn_amount',
        };
    }
    sanitiseInput(input) {
        return super.sanitiseInput(input).then((input) => {
            input = "Transaction Date,Transaction Description,Transaction Amount\r\n" + input;
            return new Promise((resolve, reject) => resolve(input));
        });
    }
    parseCSVRecords(records) {
        records = super.parseCSVRecords(records);
        records.forEach(function (record, idx) {
            if (record.txn_amount) {
                record.txn_amount = record.txn_amount.replace(/,/g, '');
                if (record.txn_amount >= 0) {
                    record.txn_amount_credit = +record.txn_amount;
                    record.txn_amount_debit = 0;
                }
                else {
                    record.txn_amount_debit = -1 * record.txn_amount;
                    record.txn_amount_credit = 0;
                }
                delete record.txn_amount;
                //pulls the transaction type off the end of the description, which is a 2-3 character code at the end of the string, preceded by whitespace
                const type_from_desc_match = record.txn_desc.match(/\s+(\S\S\S?)$/);
                if (type_from_desc_match && type_from_desc_match.length >= 2) {
                    record.txn_type = hsbc_1.HSBCTransTypes[type_from_desc_match[1]];
                }
                record.txn_src = 'HSBC';
            }
            else {
                records.splice(idx, 1);
            }
        }.bind(this));
        return records;
    }
}
exports.HSBCCSVParser = HSBCCSVParser;
//# sourceMappingURL=hsbc.js.map