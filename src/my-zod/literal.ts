import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

type Literal = string | number | bigint | boolean | null | undefined;

export function literal<T extends Literal>(
    value: T | readonly T[],
    customMessage?: string,
): MyZodLiteral<T> {
    return new MyZodLiteral<T>(value, customMessage);
}

export class MyZodLiteral<T extends Literal> extends MyZodType<Literal> {
    #values: readonly T[];
    constructor(
        value: T | readonly T[],
        private customMessage?: string,
    ) {
        super();
        this.#values = Array.isArray(value) ? value : [value];
    }

    validate(ctx: ParseContext<T>): ParseContext<T> {
        if (this.#values.includes(ctx.value)) {
            return ctx;
        }
        const message =
            this.customMessage ||
            `Input must contain ${this.#values.join(', ')}`;
        ctx.issues.push({
            message,
            path: ['literal'],
        });
        return ctx;
    }
}
