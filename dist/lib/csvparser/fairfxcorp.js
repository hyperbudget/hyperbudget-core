"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvparser_1 = require("../csvparser");
class FairFXCorpCSVParser extends csvparser_1.CSVParser {
    constructor() {
        super(...arguments);
        this.srcName = 'FairFX Corp';
        this.txnMap = {
            'date': 'txn_date',
            'type': 'txn_type',
            'pan': 'acc_number',
            'description': 'txn_desc',
            'debit': 'txn_amount_debit',
            'credit': 'txn_amount_credit',
        };
    }
    parseCSVRecords(records) {
        return super.parseCSVRecords(records);
    }
}
exports.FairFXCorpCSVParser = FairFXCorpCSVParser;
//# sourceMappingURL=fairfxcorp.js.map