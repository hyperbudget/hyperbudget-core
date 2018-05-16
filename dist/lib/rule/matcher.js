"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
class RuleMatcher {
    static parse_number_rule(value, [op, comparison]) {
        if (isNaN(value)) {
            throw new Error(`parse_number_rule: given ${value} which is not numeric`);
        }
        if (isNaN(comparison)) {
            throw new Error(`parse_number_rule: given ${comparison} which is not numeric`);
        }
        switch (op) {
            case '=':
                return value === comparison;
            case '!=':
                return value !== comparison;
            case '>':
                return value > comparison;
            case '<':
                return value < comparison;
            case '>=':
                return value >= comparison;
            case '<=':
                return value <= comparison;
            default:
                throw new Error("no valid comparison given");
        }
    }
    static parse_number_rules(value, match_config) {
        let match;
        let mode = match_config.mode || enums_1.RuleMatchMode.Strict;
        let rules = match_config.rules;
        if (mode === enums_1.RuleMatchMode.Strict) {
            match = true;
        }
        else {
            match = false;
        }
        if (isNaN(value)) {
            throw new Error(`_parse_number_rules: ${value} is not a number`);
        }
        if (!Array.isArray(rules)) {
            console.error(rules);
            throw new Error(`_parse_number_rules: given ${rules} which is not an array`);
        }
        rules.forEach(function (rule) {
            if (mode === enums_1.RuleMatchMode.Strict) {
                match = match && RuleMatcher.parse_number_rule(value, rule);
            }
            else {
                match = match || RuleMatcher.parse_number_rule(value, rule);
            }
        });
        return match;
    }
    static parse_string_rule(value, [op, comparison]) {
        value = value.toUpperCase();
        comparison = comparison.toUpperCase();
        switch (op) {
            case '=':
                return value === comparison;
            case '!=':
                return value !== comparison;
            case '=~':
                return !!value.match(new RegExp(comparison));
            case '!~':
                return !value.match(new RegExp(comparison));
            default:
                throw new Error("no valid comparison given");
        }
    }
    static parse_string_rules(value, match_config) {
        let match;
        let mode = match_config.mode || enums_1.RuleMatchMode.Strict;
        let rules = match_config.rules;
        if (mode === enums_1.RuleMatchMode.Strict) {
            match = true;
        }
        else {
            match = false;
        }
        if (!Array.isArray(rules)) {
            console.error(rules);
            throw new Error(`_parse_number_rules: given ${rules} which is not an array`);
        }
        rules.forEach(function (rule) {
            if (mode === enums_1.RuleMatchMode.Strict) {
                match = match && RuleMatcher.parse_string_rule(value, rule);
            }
            else {
                match = match || RuleMatcher.parse_string_rule(value, rule);
            }
        });
        return match;
    }
}
exports.RuleMatcher = RuleMatcher;
//# sourceMappingURL=matcher.js.map