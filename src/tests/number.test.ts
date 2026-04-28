import { number } from '#my-zod/number.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Number Validation', () => {
    describe('Single Parse', () => {
        it('When input is number, should return number', () => {
            const testNumber = 123;
            const zodNumber = number();

            const result = zodNumber.parse(testNumber);

            expect(result).toBe(testNumber);
        });

        it('When input is not number, should throw error with default message', () => {
            const zodNumber = number();

            expect(() => {
                zodNumber.parse('123');
            }).toThrow('Input must be a number');
        });

        it('When input is not number and custom message is provided, should throw error with custom message', () => {
            const zodNumber = number('Custom message');

            expect(() => {
                zodNumber.parse('123');
            }).toThrow('Custom message');
        });
    });

    describe('Multiple Parse', () => {
        describe('Minimum Value', () => {
            it('When input is number with minimum value, should return number', () => {
                const testNumber = 123;
                const zodNumber = number().min(100);

                const result = zodNumber.parse(testNumber);

                expect(result).toBe(testNumber);
            });

            it('When input is number with less than minimum value and not provided custom message, should throw error with default message', () => {
                const zodNumber = number().min(100);

                expect(() => {
                    zodNumber.parse(99);
                }).toThrow('Number must be at least 100');
            });

            it('When input is number with less than minimum value and provided custom message, should throw error with custom message', () => {
                const zodNumber = number().min(100, 'Custom message');

                expect(() => {
                    zodNumber.parse(99);
                }).toThrow('Custom message');
            });
        });

        describe('Maximum Value', () => {
            it('When input is number with maximum value, should return number', () => {
                const testNumber = 23;
                const zodNumber = number().max(100);

                const result = zodNumber.parse(testNumber);

                expect(result).toBe(testNumber);
            });

            it('When input is number with more than maximum value and not provided custom message, should throw error with default message', () => {
                const zodNumber = number().max(100);

                expect(() => {
                    zodNumber.parse(101);
                }).toThrow('Number must be at most 100');
            });

            it('When input is number with more than maximum value and provided custom message, should throw error with custom message', () => {
                const zodNumber = number().max(100, 'Custom message');

                expect(() => {
                    zodNumber.parse(101);
                }).toThrow('Custom message');
            });
        });

        describe('Positive', () => {
            it('When input is positive number, should return number', () => {
                const testNumber = 23;
                const zodNumber = number().positive();

                const result = zodNumber.parse(testNumber);

                expect(result).toBe(testNumber);
            });

            it('When input is negative number, should throw error with default message', () => {
                const zodNumber = number().positive();

                expect(() => {
                    zodNumber.parse(-1);
                }).toThrow('Number must be positive');
            });

            it('When input is negative number and custom message is provided, should throw error with custom message', () => {
                const zodNumber = number().positive('Custom message');

                expect(() => {
                    zodNumber.parse(-1);
                }).toThrow('Custom message');
            });
        });

        describe('Negative', () => {
            it('When input is negative number, should return number', () => {
                const testNumber = -23;
                const zodNumber = number().negative();

                const result = zodNumber.parse(testNumber);

                expect(result).toBe(testNumber);
            });

            it('When input is positive number, should throw error with default message', () => {
                const zodNumber = number().negative();

                expect(() => {
                    zodNumber.parse(1);
                }).toThrow('Number must be negative');
            });

            it('When input is positive number and custom message is provided, should throw error with custom message', () => {
                const zodNumber = number().negative('Custom message');

                expect(() => {
                    zodNumber.parse(1);
                }).toThrow('Custom message');
            });
        });
    });
});
