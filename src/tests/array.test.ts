import { describe, expect, it } from 'vitest';
import { array } from '#my-zod/array.js';
import { number } from '#my-zod/number.js';
import { string } from '#my-zod/string.js';

describe('My Zod Array Validation', () => {
    describe('Without argument validator', () => {
        it('When input is array, should return array', () => {
            const testArray = [1, 2, 3];
            const zodArray = array();

            const result = zodArray.parse(testArray);

            expect(result).toBe(testArray);
        });

        it('When input is not array, should throw error with default message', () => {
            const zodArray = array();

            expect(() => {
                zodArray.parse(123);
            }).toThrow('Expected array');
        });
    });

    describe('With argument validator', () => {
        describe('Number', () => {
            it('When input is array with number, should return array', () => {
                const testArray = [1, 2, 3];
                const zodArray = array(number());

                const result = zodArray.parse(testArray);

                expect(result).toBe(testArray);
            });

            it('When input is not array with number, should throw error contain number message', () => {
                const zodArray = array(number());

                expect(() => {
                    zodArray.parse(['a', 'b', 'c']);
                }).toThrow('Input must be a number');
            });

            it('When input is array with number but not conform to validator, should throw error contain validator message', () => {
                const zodArray = array(number().min(10));

                expect(() => {
                    zodArray.parse([9, 10, 11]);
                }).toThrow('Number must be at least 10');
            });
        });

        describe('String', () => {
            it('When input is array with string, should return array', () => {
                const testArray = ['a', 'b', 'c'];
                const zodArray = array(string());

                const result = zodArray.parse(testArray);

                expect(result).toBe(testArray);
            });

            it('When input is not array with string, should throw error contain string message', () => {
                const zodArray = array(string());

                expect(() => {
                    zodArray.parse([1, 2, 3]);
                }).toThrow('Input must be a string');
            });

            it('When input is array with string but not conform to validator, should throw error contain validator message', () => {
                const zodArray = array(string().minLength(10));

                expect(() => {
                    zodArray.parse(['a', 'b', 'c']);
                }).toThrow('String must be at least 10 characters long');
            });
        });
    });
});
