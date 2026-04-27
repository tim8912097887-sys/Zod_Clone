import { MyZodIssue } from './error.js';

export type ParseContext<T = unknown> = {
    value: T;
    issues: MyZodIssue[];
};
