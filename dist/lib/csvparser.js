"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parse_1 = __importDefault(require("csv-parse"));
class CSVParser {
    constructor() {
        this.txnMap = {};
        this.srcName = 'Generic Parser';
    }
    parseCSVRecords(records) {
        records.forEach(function (record) {
            Object.keys(record).forEach(function (key) {
                if (this.txnMap[key]) {
                    let name = this.txnMap[key];
                    record[name] = record[key];
                }
                delete record[key];
            }.bind(this));
            record.txn_src = this.srcName;
        }.bind(this));
        return records;
    }
    parseCSVFile(input) {
        return new Promise(function (resolve, reject) {
            this.sanitiseInput(input).then(function (csv_text) {
                csv_parse_1.default(csv_text, { columns: true }, function (err, records) {
                    if (err) {
                        throw new Error(err);
                    }
                    resolve(this.parseCSVRecords(records));
                }.bind(this));
            }.bind(this));
        }.bind(this));
    }
    sanitiseInput(input) {
        input = input.replace(/,\n/, "\n");
        input = input.replace(/,\r\n/, "\r\n");
        input = input.replace(/'/g, '');
        return new Promise((resolve, reject) => resolve(input));
    }
}
exports.CSVParser = CSVParser;
//# sourceMappingURL=csvparser.js.map