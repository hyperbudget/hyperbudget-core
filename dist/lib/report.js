"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("./transaction");
const csvparsermanager_1 = require("./manager/csvparsermanager");
;
class ReportImpl {
    constructor() {
        this.transactions = [];
        this.transactions_org = [];
    }
    filter_month(month) {
        if (!this.transactions) {
            throw new Error("No transactions yet");
        }
        this.transactions_org = this.transactions.filter(txn => txn.org_month === month);
        this.transactions = this.transactions.filter(txn => txn.month === month);
    }
}
class ReportFactory {
    constructor(options) {
        this.options = options || {};
        this._report = new ReportImpl();
    }
    get report() {
        return this._report;
    }
    set report(r) {
        this._report = r;
    }
    from_csv(csv_text, type) {
        return csvparsermanager_1.CSVParserManager.parseCSVFile(csv_text, type).then(function (records) {
            return this.add_records(records);
        }.bind(this));
    }
    from_records(records) {
        return this.add_records(records);
    }
    add_records(records) {
        let transactions = [];
        let txnSeenIdentifierMap = {};
        records.forEach(function (record) {
            let txn = new transaction_1.Transaction(record);
            //unique only
            if (!this.options.unique_only || !txnSeenIdentifierMap[txn.identifier]) {
                transactions.push(txn);
            }
            txnSeenIdentifierMap[txn.identifier] = true;
        }.bind(this));
        this.report.transactions = this.report.transactions.concat(transactions);
        return new Promise((resolve, reject) => resolve());
    }
}
exports.ReportFactory = ReportFactory;
exports.default = ReportFactory;
//# sourceMappingURL=report.js.map