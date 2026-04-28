import { any } from '#my-zod/any.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Any Validation', () => {
    it('When input is string, should return string', () => {
        const testAny = 'test';
        const zodAny = any();

        const result = zodAny.parse(testAny);

        expect(result).toBe(testAny);
    });

    it('When input is number, should return number', () => {
        const testAny = 123;
        const zodAny = any();

        const result = zodAny.parse(testAny);

        expect(result).toBe(testAny);
    });
});
