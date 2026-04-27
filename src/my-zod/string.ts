import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

export function string(string?: string): MyZodString {
    return new MyZodString(string);
}

class MyZodString extends MyZodType<string> {
    constructor(private customMessage?: string) {
        super();
    }
    protected validate({ value, issues }: ParseContext): ParseContext {
        if (typeof value !== 'string') {
            const message = this.customMessage || 'Invalid input';
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

    min(length: number, message?: string) {
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

    max(length: number, message?: string) {
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
