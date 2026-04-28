import { literal } from '#my-zod/literal.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Literal', () => {
    describe('Non array literal check', () => {
        it('When input is literal, should return literal', () => {
            const testLiteral = 'test';
            const zodLiteral = literal(testLiteral);

            const result = zodLiteral.parse(testLiteral);

            expect(result).toBe(testLiteral);
        });

        it('When input is not literal, should throw error with default message', () => {
            const zodLiteral = literal('test');

            expect(() => {
                zodLiteral.parse('123');
            }).toThrow('Input must contain test');
        });

        it('When input is not literal and custom message is provided, should throw error with custom message', () => {
            const zodLiteral = literal('test', 'Custom message');

            expect(() => {
                zodLiteral.parse('123');
            }).toThrow('Custom message');
        });
    });

    describe('Array literal check', () => {
        it('When input is in literal, should return literal', () => {
            const testLiteral = 'test';
            const zodLiteral = literal([testLiteral]);

            const result = zodLiteral.parse(testLiteral);

            expect(result).toBe(testLiteral);
        });

        it('When input is not in literal, should throw error with default message', () => {
            const zodLiteral = literal(['test', 234]);

            expect(() => {
                zodLiteral.parse('123');
            }).toThrow('Input must contain test');
        });

        it('When input is not in literal and custom message is provided, should throw error with custom message', () => {
            const zodLiteral = literal(['test', undefined], 'Custom message');

            expect(() => {
                zodLiteral.parse('123');
            }).toThrow('Custom message');
        });
    });
});
