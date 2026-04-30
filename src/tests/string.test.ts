import { string } from '#my-zod/string.js';
import { describe, expect, it } from 'vitest';

describe('My Zod String Validation', () => {
    describe('Single Parse', () => {
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
            }).toThrow('Input must be a string');
        });

        it('When input is not string and custom message is provided, should throw error with custom message', () => {
            const zodString = string('Custom message');

            expect(() => {
                zodString.parse(123);
            }).toThrow('Custom message');
        });
    });

    describe('Single Safe Parse', () => {
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
            expect(result.error?.message).toContain('Input must be a string');
        });

        it('When input is not string and custom message is provided, should return error with custom message', () => {
            const zodString = string('Custom message');

            const result = zodString.safeParse(123);

            expect(result.success).toBe(false);
            expect(result.error?.message).toContain('Custom message');
        });
    });

    describe('Multiple Parse', () => {
        describe('Minimum Length', () => {
            it('When input is string with minimum length, should return string', () => {
                const testString = 'test';
                const zodString = string().minLength(4);

                const result = zodString.parse(testString);

                expect(result).toBe(testString);
            });

            it('When input is string with less than minimum length and not provided custom message, should throw error with default message', () => {
                const zodString = string().minLength(4);

                expect(() => {
                    zodString.parse('tes');
                }).toThrow('String must be at least 4 characters long');
            });

            it('When input is string with less than minimum length and provided custom message, should throw error with custom message', () => {
                const zodString = string().minLength(4, 'Custom message');

                expect(() => {
                    zodString.parse('tes');
                }).toThrow('Custom message');
            });
        });

        describe('Maximum Length', () => {
            it('When input is string with maximum length, should return string', () => {
                const testString = 'test';
                const zodString = string().maxLength(4);

                const result = zodString.parse(testString);

                expect(result).toBe(testString);
            });

            it('When input is string with more than maximum length and not provided custom message, should throw error with default message', () => {
                const zodString = string().maxLength(4);

                expect(() => {
                    zodString.parse('tests');
                }).toThrow('String must be at most 4 characters long');
            });

            it('When input is string with more than maximum length and provided custom message, should throw error with custom message', () => {
                const zodString = string().maxLength(4, 'Custom message');

                expect(() => {
                    zodString.parse('tests');
                }).toThrow('Custom message');
            });
        });

        describe('Length', () => {
            it('When input is string with exact length, should return string', () => {
                const testString = 'test';
                const zodString = string().length(4);

                const result = zodString.parse(testString);

                expect(result).toBe(testString);
            });

            it('When input is string with different length and not provided custom message, should throw error with default message', () => {
                const zodString = string().length(4);

                expect(() => {
                    zodString.parse('tests');
                }).toThrow('String must be 4 characters long');
            });

            it('When input is string with different length and provided custom message, should throw error with custom message', () => {
                const zodString = string().length(4, 'Custom message');

                expect(() => {
                    zodString.parse('tests');
                }).toThrow('Custom message');
            });
        });

        describe('Regex', () => {
            it('When input matches regex, should return string', () => {
                const testString = 'test';
                const zodString = string().regex(/test/);

                const result = zodString.parse(testString);

                expect(result).toBe(testString);
            });

            it('When input does not match regex and not provided custom message, should throw error with default message', () => {
                const zodString = string().regex(/test/);

                expect(() => {
                    zodString.parse('tes');
                }).toThrow('Invalid input');
            });

            it('When input does not match regex and provided custom message, should throw error with custom message', () => {
                const zodString = string().regex(/test/, 'Custom message');

                expect(() => {
                    zodString.parse('tes');
                }).toThrow('Custom message');
            });
        });
    });

    describe('With Transformers', () => {
        it('When input is string with uppercase transform, should return uppercase string', () => {
            const testString = 'test';
            const zodString = string().toUppercase();

            const result = zodString.parse(testString);

            expect(result).toBe(testString.toUpperCase());
        });

        it('When input is string with lowercase transform, should return lowercase string', () => {
            const testString = 'TEST';
            const zodString = string().toLowercase();

            const result = zodString.parse(testString);

            expect(result).toBe(testString.toLowerCase());
        });

        it('When input is string with trim transform, should return trimmed string', () => {
            const testString = '   test   ';
            const zodString = string().trim();

            const result = zodString.parse(testString);

            expect(result).toBe(testString.trim());
        });
    });
});
