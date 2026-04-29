import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

export function object<T extends Record<PropertyKey, MyZodType<any>>>(
    validator: T,
) {
    return new MyZodObject(validator);
}

export class MyZodObject<
    const Schema extends Record<PropertyKey, MyZodType<any>>,
    Output extends {
        [K in keyof Schema]: Schema[K] extends MyZodType<infer T> ? T : never;
    },
> extends MyZodType<Output> {
    #schema: Schema;
    constructor(validator: Schema) {
        super();
        this.#schema = validator;
    }

    validate(ctx: ParseContext<Output>): ParseContext {
        // Check if the value is an object
        if (
            typeof ctx.value !== 'object' ||
            ctx.value === null ||
            Array.isArray(ctx.value)
        ) {
            ctx.issues.push({
                message: 'Expected object',
                path: ['object'],
            });
            return ctx;
        }

        // Validate each property of the object
        for (const key in this.#schema) {
            const schema = this.#schema[key];
            const value = ctx.value[key];
            const result = schema.safeParse(value);
            if (!result.success) {
                ctx.issues.push({
                    message: result.error?.message as string,
                    path: ['object', key],
                });
            } else {
                ctx.value[key] = result.data;
            }
        }
        return ctx;
    }
}
