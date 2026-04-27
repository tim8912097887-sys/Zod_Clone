import { ParseContext } from './type.js';

export abstract class MyZodType<T> {
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
        const result = this.validate({ value: input, issues: [] });
        if (result.issues.length > 0) {
            return { success: false, error: JSON.stringify(result.issues) };
        }
        return { success: true, data: result.value as T };
    }
}
