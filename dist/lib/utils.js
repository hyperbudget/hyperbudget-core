"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static format_number(num) {
        return (!isNaN(num) ? Number(num).toFixed(2) : num.toString());
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map