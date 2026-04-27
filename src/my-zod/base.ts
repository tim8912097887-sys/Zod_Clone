export class MyZodType {
    parse(input: unknown) {
        const result = this.safeParse(input);
        if (!result.success) {
            throw new Error(result.error);
        }
        return input;
    }

    safeParse(input: unknown) {
        if (typeof input !== 'string') {
            return { success: false, error: 'Invalid input' };
        }
        return { success: true, data: input };
    }
}
