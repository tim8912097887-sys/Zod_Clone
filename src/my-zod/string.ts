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
}
