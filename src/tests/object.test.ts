import { describe, expect, it } from 'vitest';
import { object } from '#my-zod/object.js';
import { string } from '#my-zod/string.js';
import { number } from '#my-zod/number.js';

describe('My Zod Object', () => {
    describe('Object with argument validator', () => {
        it('When input is object and conform to validator, should return object', () => {
            const testObject = {
                name: 'John',
                age: 30,
            };
            const zodObject = object({
                name: string(),
                age: number(),
            });

            const result = zodObject.parse(testObject);

            expect(result).toBe(testObject);
        });

        it('When input is object but not conform to validator, should throw error contain validator message', () => {
            const testObject = {
                name: 'John',
                age: '30',
            };
            const zodObject = object({
                name: string(),
                age: number(),
            });

            expect(() => {
                zodObject.parse(testObject);
            }).toThrow('Input must be a number');
        });

        it('When input is not object, should throw error with default message', () => {
            const zodObject = object({
                name: string(),
                age: number(),
            });

            expect(() => {
                zodObject.parse('123');
            }).toThrow('Expected object');
        });

        it('When input is object but not conform to validator and custom message is provided, should throw error with custom message', () => {
            const testObject = {
                name: 'John',
                age: 300,
            };
            const zodObject = object({
                name: string(),
                age: number().max(100, 'Custom message'),
            });

            expect(() => {
                zodObject.parse(testObject);
            }).toThrow('Custom message');
        });
    });
});
