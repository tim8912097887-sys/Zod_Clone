import { MyZodType } from './base.js';
import { ParseContext } from './type.js';

export function array<T>(
    argumentValidator?: MyZodType<T>,
    customMessage?: string,
): MyZodArray<T> {
    return new MyZodArray<T>(argumentValidator, customMessage);
}

class MyZodArray<T> extends MyZodType<Array<T>> {
    constructor(
        private argumentValidator?: MyZodType<T>,
        private customMessage?: string,
    ) {
        super();
    }
    protected validate(ctx: ParseContext): ParseContext {
        if (!Array.isArray(ctx.value)) {
            ctx.issues.push({
                message: this.customMessage || 'Expected array',
                path: ['array'],
            });
        }
        const arrayCtx = ctx as ParseContext<Array<T>>;
        if (this.argumentValidator) {
            for (let i = 0; i < arrayCtx.value.length; i++) {
                const result = this.argumentValidator.safeParse(
                    arrayCtx.value[i],
                );
                if (!result.success) {
                    arrayCtx.issues.push({
                        message: result.error as string,
                        path: ['array', i],
                    });
                }
            }
        }
        return arrayCtx;
    }
}
