import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

export function never(): MyZodNever {
    return new MyZodNever();
}

class MyZodNever extends MyZodType<never> {
    protected validate(ctx: ParseContext<never>): ParseContext<never> {
        ctx.issues.push({ message: 'Expected never', path: ['never'] });
        return ctx;
    }
}
