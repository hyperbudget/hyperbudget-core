import { NumericMatchConfig, StringMatchConfig, NumberMatchOp, StringMatchOp } from '../../types/match-config';
export declare class RuleMatcher {
    static parse_number_rule(value: number, [op, comparison]: [NumberMatchOp, number]): boolean;
    static parse_number_rules(value: number, match_config: NumericMatchConfig): boolean;
    static parse_string_rule(value: string, [op, comparison]: [StringMatchOp, string]): boolean;
    static parse_string_rules(value: string, match_config: StringMatchConfig): boolean;
}
