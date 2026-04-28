import { MyZodString } from './string.js';
import { ParseContext } from './type.js';

export function email(customMessage?: string): MyZodEmail {
    return new MyZodEmail(customMessage);
}

class MyZodEmail extends MyZodString {
    protected validate({ value, issues }: ParseContext): ParseContext {
        const stringValidationResult = super.validate({ value, issues });
        if (stringValidationResult.issues.length > 0) {
            return stringValidationResult;
        }
        const emailCtx = stringValidationResult as ParseContext<string>;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailCtx.value)) {
            const message = this.customMessage || 'Invalid email address';
            emailCtx.issues.push({ message, path: ['email'] });
            return emailCtx;
        }
        return emailCtx;
    }
}
