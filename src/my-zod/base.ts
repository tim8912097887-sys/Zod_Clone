export abstract class MyZodType<T> {
    protected abstract validate(input: unknown): T;

    parse(input: unknown): T {
        const result = this.safeParse(input);
        if (result.success) {
            const data = result.data as T;
            return data;
        }
        throw new Error(result.error);
    }

    safeParse(input: unknown) {
        try {
            const result = this.validate(input);
            return { success: true, data: result as T };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
}
