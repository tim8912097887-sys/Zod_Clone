import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

export function nan(customMessage?: string): MyZodNaN {
    return new MyZodNaN(customMessage);
}

class MyZodNaN extends MyZodType<number> {
    constructor(private customMessage?: string) {
        super();
    }

    validate({ value, issues }: ParseContext<number>): ParseContext {
        if (!Number.isNaN(value) || !isNaN(value)) {
            issues.push({
                message: this.customMessage || 'Expected NaN',
                path: ['nan'],
            });
            return { value, issues };
        }
        return { value, issues };
    }
}
