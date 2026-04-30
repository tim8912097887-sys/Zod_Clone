import { MyZodType } from './base.js';
import { MyZodIssue } from './error.js';

export type ParseContext<T = unknown> = {
    value: T;
    issues: MyZodIssue[];
};

export type infer<T extends MyZodType<any>> =
    T extends MyZodType<infer U> ? U : never;
