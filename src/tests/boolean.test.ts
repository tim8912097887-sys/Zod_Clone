import { boolean } from '#my-zod/boolean.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Boolean Validation', () => {
    it('When input is boolean, should return boolean', () => {
        const testBoolean = true;
        const zodBoolean = boolean();

        const result = zodBoolean.parse(testBoolean);

        expect(result).toBe(testBoolean);
    });

    it('When input is not boolean, should throw error with default message', () => {
        const zodBoolean = boolean();

        expect(() => {
            zodBoolean.parse(123);
        }).toThrow('Input must be a boolean');
    });

    it('When input is not boolean and custom message is provided, should throw error with custom message', () => {
        const zodBoolean = boolean('Custom message');

        expect(() => {
            zodBoolean.parse(123);
        }).toThrow('Custom message');
    });
});
