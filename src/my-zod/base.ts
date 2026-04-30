import { MyZodError } from './error.js';
import { ParseContext } from './type.js';

export abstract class MyZodType<T> {
    protected validators: Array<(ctx: ParseContext<T>) => boolean> = [];
    protected transformer: Array<(input: T) => T> = [];
    protected abstract validate(ctx: ParseContext): ParseContext;

    parse(input: unknown): T {
        const result = this.safeParse(input);
        if (result.success) {
            const data = result.data as T;
            return data;
        }
        throw result.error;
    }

    safeParse(input: unknown) {
        // Type check
        const result = this.validate({ value: input, issues: [] });
        if (result.issues.length > 0) {
            return { success: false, error: new MyZodError(result.issues) };
        }
        const data = result as ParseContext<T>;
        // Run validators
        this.validators.forEach((validator) => validator(data));
        if (data.issues.length > 0) {
            return { success: false, error: new MyZodError(data.issues) };
        }
        // Run transformers
        this.transformer.forEach(
            (transformer) => (data.value = transformer(data.value)),
        );
        return { success: true, data: data.value };
    }
}
