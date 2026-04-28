import { MyZodString } from './string.js';
import { ParseContext } from './type.js';

export function uuid(customMessage?: string): MyZodUuid {
    return new MyZodUuid(customMessage);
}

const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

class MyZodUuid extends MyZodString {
    protected validate({ value, issues }: ParseContext): ParseContext {
        const stringValidationResult = super.validate({ value, issues });
        if (stringValidationResult.issues.length > 0) {
            return stringValidationResult;
        }
        const successValue = stringValidationResult as ParseContext<string>;
        if (uuidRegex.test(successValue.value) === false) {
            const message = this.customMessage || 'Invalid UUID';
            successValue.issues.push({ message, path: ['uuid'] });
            return successValue;
        }
        return successValue;
    }
}
