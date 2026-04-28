import { isUndefined } from '#my-zod/undefined.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Undefined', () => {
    it('When input is undefined, should return undefined', () => {
        const testUndefined = undefined;
        const zodUndefined = isUndefined();

        const result = zodUndefined.parse(testUndefined);

        expect(result).toBe(testUndefined);
    });

    it('When input is not undefined, should throw error with default message', () => {
        const zodUndefined = isUndefined();

        expect(() => {
            zodUndefined.parse(123);
        }).toThrow('Input must contain ');
    });

    it('When input is not undefined and custom message is provided, should throw error with custom message', () => {
        const zodUndefined = isUndefined('Custom message');

        expect(() => {
            zodUndefined.parse(123);
        }).toThrow('Custom message');
    });
});
