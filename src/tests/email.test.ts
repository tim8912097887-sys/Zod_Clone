import { email } from '#my-zod/email.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Email Validation', () => {
    describe('String check', () => {
        it('When input is not string, should throw error with default message', () => {
            const testString = 123;
            const zodEmail = email();

            expect(() => {
                zodEmail.parse(testString);
            }).toThrow('Input must be a string');
        });

        it('When input is not string and custom message is provided, should throw error with custom message', () => {
            const testString = 123;
            const zodEmail = email('Custom message');

            expect(() => {
                zodEmail.parse(testString);
            }).toThrow('Custom message');
        });
    });

    describe('Email check', () => {
        it('When input is email, should return email', () => {
            const testString = 'test@gmail.com';
            const zodEmail = email();

            const result = zodEmail.parse(testString);

            expect(result).toBe(testString);
        });
        it('When input is not email, should throw error with default message', () => {
            const testString = 'test';
            const zodEmail = email();

            expect(() => {
                zodEmail.parse(testString);
            }).toThrow('Invalid email address');
        });

        it('When input is not email and custom message is provided, should throw error with custom message', () => {
            const testString = 'test';
            const zodEmail = email('Custom message');

            expect(() => {
                zodEmail.parse(testString);
            }).toThrow('Custom message');
        });
    });

    describe('Multiple Parse', () => {
        describe('Minimum Length', () => {
            it('When input is email but less than minimum length, should throw error with default message', () => {
                const testString = 'test@gmail.com';
                const zodEmail = email().minLength(20);

                expect(() => {
                    zodEmail.parse(testString);
                }).toThrow('String must be at least 20 characters long');
            });

            it('When input is email but less than minimum length and custom message is provided, should throw error with custom message', () => {
                const testString = 'test@gmail.com';
                const zodEmail = email().minLength(20, 'Custom message');

                expect(() => {
                    zodEmail.parse(testString);
                }).toThrow('Custom message');
            });
        });

        describe('Maximum Length', () => {
            it('When input is email but more than maximum length, should throw error with default message', () => {
                const testString = 'testweojfwejfwej@gmail.com';
                const zodEmail = email().maxLength(20);

                expect(() => {
                    zodEmail.parse(testString);
                }).toThrow('String must be at most 20 characters long');
            });

            it('When input is email but more than maximum length and custom message is provided, should throw error with custom message', () => {
                const testString = 'testweojfwejfwej@gmail.com';
                const zodEmail = email().maxLength(20, 'Custom message');

                expect(() => {
                    zodEmail.parse(testString);
                }).toThrow('Custom message');
            });
        });
    });
});
