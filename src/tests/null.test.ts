import { isNull } from '#my-zod/null.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Null', () => {
    it('When input is null, should return null', () => {
        const testNull = null;
        const zodNull = isNull();

        const result = zodNull.parse(testNull);

        expect(result).toBe(testNull);
    });

    it('When input is not null, should throw error with default message', () => {
        const zodNull = isNull();

        expect(() => {
            zodNull.parse(123);
        }).toThrow('Input must contain ');
    });

    it('When input is not null and custom message is provided, should throw error with custom message', () => {
        const zodNull = isNull('Custom message');

        expect(() => {
            zodNull.parse(123);
        }).toThrow('Custom message');
    });
});
