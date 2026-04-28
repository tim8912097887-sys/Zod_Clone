import { MyZodLiteral } from './literal.js';

export function isUndefined(customMessage?: string): MyZodUndefined {
    return new MyZodUndefined(customMessage);
}

class MyZodUndefined extends MyZodLiteral<undefined> {
    constructor(customMessage?: string) {
        super(undefined, customMessage);
    }
}
