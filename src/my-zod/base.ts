import { ParseContext } from './type.js';

export abstract class MyZodType<T> {
    protected validators: Array<(ctx: ParseContext<T>) => boolean> = [];

    protected abstract validate(ctx: ParseContext): ParseContext;

    parse(input: unknown): T {
        const result = this.safeParse(input);
        if (result.success) {
            const data = result.data as T;
            return data;
        }
        throw new Error(result.error);
    }

    safeParse(input: unknown) {
        // Type check
        const result = this.validate({ value: input, issues: [] });
        if (result.issues.length > 0) {
            return { success: false, error: JSON.stringify(result.issues) };
        }
        const data = result as ParseContext<T>;
        // Run validators
        this.validators.forEach((validator) => validator(data));
        if (result.issues.length > 0) {
            return { success: false, error: JSON.stringify(result.issues) };
        }
        return { success: true, data: result.value as T };
    }
}
