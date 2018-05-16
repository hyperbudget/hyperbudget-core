import { RuleMatchMode } from "../lib/enums";
export declare type NumericMatchConfig = {
    mode?: RuleMatchMode;
    rules: [NumberMatchOp, number][];
};
export declare type StringMatchConfig = {
    mode?: RuleMatchMode;
    rules: [StringMatchOp, string][];
};
export declare type NumberMatchOp = '=' | '!=' | '>' | '<' | '>=' | '<=';
export declare type StringMatchOp = '=' | '!=' | '=~' | '!~';
