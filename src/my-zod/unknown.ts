import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

export function unknown(): MyZodUnknown {
    return new MyZodUnknown();
}

class MyZodUnknown extends MyZodType<unknown> {
    validate(ctx: ParseContext): ParseContext {
        return ctx;
    }
}
