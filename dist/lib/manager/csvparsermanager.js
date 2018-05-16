"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hsbc_1 = require("../csvparser/hsbc");
const lloyds_1 = require("../csvparser/lloyds");
const midata_1 = require("../csvparser/midata");
const fairfxcorp_1 = require("../csvparser/fairfxcorp");
const rbs_1 = require("../csvparser/rbs");
class CSVParserManager {
    static parseCSVFile(input, type) {
        let parser;
        switch (type) {
            case 'lloyds':
                parser = new lloyds_1.LloydsCSVParser();
                break;
            case 'hsbc':
                parser = new hsbc_1.HSBCCSVParser();
                break;
            case 'fairfx-corp':
                parser = new fairfxcorp_1.FairFXCorpCSVParser();
                break;
            case 'midata':
                parser = new midata_1.MidataCSVParser();
                break;
            case 'rbs':
                parser = new rbs_1.RBSCSVParser();
                break;
            default:
                throw new Error(`CSV file Type ${type} unknown`);
        }
        return parser.parseCSVFile(input);
    }
}
exports.CSVParserManager = CSVParserManager;
//# sourceMappingURL=csvparsermanager.js.map