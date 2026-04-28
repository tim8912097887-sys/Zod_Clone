import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

export function any(): MyZodAny {
    return new MyZodAny();
}

class MyZodAny extends MyZodType<any> {
    validate(ctx: ParseContext<any>): ParseContext<any> {
        return ctx;
    }
}
