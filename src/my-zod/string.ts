import { MyZodType } from './base.js';

export function string(string?: string): MyZodString {
    return new MyZodString(string);
}

class MyZodString extends MyZodType<string> {
    constructor(private customMessage?: string) {
        super();
    }
    protected validate(input: unknown): string {
        if (typeof input !== 'string') {
            const message = this.customMessage || 'Invalid input';
            throw new Error(message);
        }
        return input;
    }
}
