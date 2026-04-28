import { MyZodLiteral } from './literal.js';

export function isNull(customMessage?: string): MyZodNull {
    return new MyZodNull(customMessage);
}

class MyZodNull extends MyZodLiteral<null> {
    constructor(customMessage?: string) {
        super(null, customMessage);
    }
}
