import { string } from '#my-zod/string.js';
import { describe, expect, it } from 'vitest';

describe('My Zod String', () => {
    describe('Parse', () => {
        it('Wehn input is string, should return string', () => {
            const testString = 'test';
            const zodString = string();

            const result = zodString.parse(testString);

            expect(result).toBe(testString);
        });

        it('When input is not string, should throw error with default message', () => {
            const zodString = string();

            expect(() => {
                zodString.parse(123);
            }).toThrow('Invalid input');
        });

        it('When input is not string and custom message is provided, should throw error with custom message', () => {
            const zodString = string('Custom message');

            expect(() => {
                zodString.parse(123);
            }).toThrow('Custom message');
        });
    });

    describe('Safe Parse', () => {
        it('When input is string, should return string', () => {
            const testString = 'test';
            const zodString = string();

            const result = zodString.safeParse(testString);

            expect(result.success).toBe(true);
            expect(result.data).toBe(testString);
        });

        it('When input is not string, should return error with default message', () => {
            const zodString = string();

            const result = zodString.safeParse(123);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid input');
        });

        it('When input is not string and custom message is provided, should return error with custom message', () => {
            const zodString = string('Custom message');

            const result = zodString.safeParse(123);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Custom message');
        });
    });
});
