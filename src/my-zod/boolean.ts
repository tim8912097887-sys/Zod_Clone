import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

export function boolean(customMessage?: string): MyZodBoolean {
    return new MyZodBoolean(customMessage);
}

export class MyZodBoolean extends MyZodType<boolean> {
    constructor(private customMessage?: string) {
        super();
    }
    validate({ value, issues }: ParseContext): ParseContext {
        if (typeof value !== 'boolean') {
            const customMessage =
                this.customMessage || 'Input must be a boolean';
            issues.push({ message: customMessage, path: ['boolean'] });
            return { value, issues };
        }
        return { value, issues };
    }
}
