import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

export function number(customMessage?: string): MyZodNumber {
    return new MyZodNumber(customMessage);
}

export class MyZodNumber extends MyZodType<number> {
    constructor(private customMessage?: string) {
        super();
    }
    protected validate(ctx: ParseContext): ParseContext {
        if (typeof ctx.value !== 'number' || isNaN(ctx.value)) {
            ctx.issues.push({
                message: this.customMessage || 'Invalid input',
                path: ['number'],
            });
        }
        return ctx;
    }

    min(value: number, message?: string) {
        this.validators.push((ctx) => {
            if (ctx.value < value) {
                const customMessage =
                    message || `Number must be at least ${value}`;
                ctx.issues.push({
                    message: customMessage,
                    path: ['number'],
                });
                return false;
            }
            return true;
        });
        return this;
    }

    max(value: number, message?: string) {
        this.validators.push((ctx) => {
            if (ctx.value > value) {
                const customMessage =
                    message || `Number must be at most ${value}`;
                ctx.issues.push({
                    message: customMessage,
                    path: ['number'],
                });
                return false;
            }
            return true;
        });
        return this;
    }

    positive(message?: string) {
        this.validators.push((ctx) => {
            if (ctx.value < 0) {
                const customMessage = message || 'Number must be positive';
                ctx.issues.push({
                    message: customMessage,
                    path: ['number'],
                });
                return false;
            }
            return true;
        });
        return this;
    }

    negative(message?: string) {
        this.validators.push((ctx) => {
            if (ctx.value > 0) {
                const customMessage = message || 'Number must be negative';
                ctx.issues.push({
                    message: customMessage,
                    path: ['number'],
                });
                return false;
            }
            return true;
        });
        return this;
    }
}
