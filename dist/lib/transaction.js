"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const sha1_1 = __importDefault(require("sha1"));
const options_1 = require("./options");
class Transaction {
    constructor(record) {
        this.txn_type = '';
        this.acc_sortcode = '';
        this.acc_number = '';
        this.txn_desc = '';
        this.txn_amount_debit = 0;
        this.txn_amount_credit = 0;
        this.txn_src = 'Unknown';
        this.acc_balance = 0;
        this.month = '';
        this.org_month = '';
        this.categories = [];
        let _validators = {
            'txn_amount_debit': function (val) { return (!val || !isNaN(val)); },
            'txn_amount_credit': function (val) { return (!val || !isNaN(val)); },
            'acc_balance': function (val) { return !isNaN(val); },
        };
        let _filters = {
            'txn_amount_debit': function (val) { return Number(val); },
            'txn_amount_credit': function (val) { return Number(val); },
            'txn_date': function (val) { return this._parse_date(val); }.bind(this),
        };
        if (record.txn_src) {
            this.txn_src = record.txn_src;
        }
        Object.keys(record).forEach(function (key) {
            this[key] = record[key];
            if (_filters[key]) {
                this[key] = _filters[key](this[key]);
            }
            if (_validators[key]) {
                if (!_validators[key](this[key])) {
                    throw new Error(`Property '${key}' (${this[key]}) fails validation: ${_validators[key]} ${this} ${record}`);
                }
            }
        }.bind(this));
        this.org_month = moment_1.default(this.txn_date).format('YYYYMM');
        if (!this.month) {
            this.month = this.org_month;
        }
        this.identifier = this._build_identifier();
    }
    txn_amount() {
        return this.txn_amount_credit - this.txn_amount_debit;
    }
    _parse_date(txn_date) {
        let src = this.txn_src;
        let format;
        format = Transaction._extract_date_format_based_on_source(src);
        return moment_1.default(txn_date, format).toDate();
    }
    static _extract_date_format_based_on_source(src) {
        let format;
        switch (src) {
            case 'FairFX Corp':
                format = options_1.Options.DATE_FORMAT_SANE;
                break;
            default:
                format = options_1.Options.DATE_FORMAT_EUROPE;
                break;
        }
        return format;
    }
    /*
     * Assuming each { Date, Description, Amount } represents a unique
     * transaction, generate an identifying sha1 hash (Date + Description +
     * Amount + Source + If available, the account balance).  In reality, there
     * is no way to guarantee the uniqueness of a transaction.
     */
    _build_identifier() {
        return sha1_1.default(this.txn_date.getTime() + this.txn_desc + this.txn_amount() + this.txn_src + (this.acc_balance ? this.acc_balance : '')).toString();
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map