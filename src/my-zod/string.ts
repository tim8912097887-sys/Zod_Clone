import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

export function string(string?: string): MyZodString {
    return new MyZodString(string);
}

export class MyZodString extends MyZodType<string> {
    constructor(protected customMessage?: string) {
        super();
    }
    protected validate({ value, issues }: ParseContext): ParseContext {
        if (typeof value !== 'string') {
            const message = this.customMessage || 'Input must be a string';
            return {
                value,
                issues: [
                    ...issues,
                    {
                        message,
                        path: ['string'],
                    },
                ],
            };
        }
        return { value, issues };
    }

    minLength(length: number, message?: string) {
        this.validators.push((ctx) => {
            if (ctx.value.length < length) {
                const customMessage =
                    message ||
                    `String must be at least ${length} characters long`;
                ctx.issues.push({
                    message: customMessage,
                    path: ['string'],
                });
                return false;
            }
            return true;
        });
        return this;
    }

    maxLength(length: number, message?: string) {
        this.validators.push((ctx) => {
            if (ctx.value.length > length) {
                const customMessage =
                    message ||
                    `String must be at most ${length} characters long`;
                ctx.issues.push({
                    message: customMessage,
                    path: ['string'],
                });
                return false;
            }
            return true;
        });
        return this;
    }

    length(length: number, message?: string) {
        this.validators.push((ctx) => {
            if (ctx.value.length !== length) {
                const customMessage =
                    message || `String must be ${length} characters long`;
                ctx.issues.push({
                    message: customMessage,
                    path: ['string'],
                });
                return false;
            }
            return true;
        });
        return this;
    }

    toUppercase() {
        this.transformer.push((value) => value.toUpperCase());
        return this;
    }

    toLowercase() {
        this.transformer.push((value) => value.toLowerCase());
        return this;
    }

    trim() {
        this.transformer.push((value) => value.trim());
        return this;
    }

    regex(regex: RegExp, message?: string) {
        this.validators.push((ctx) => {
            if (!regex.test(ctx.value)) {
                const customMessage = message || 'Invalid input';
                ctx.issues.push({
                    message: customMessage,
                    path: ['string'],
                });
                return false;
            }
            return true;
        });
        return this;
    }
}
