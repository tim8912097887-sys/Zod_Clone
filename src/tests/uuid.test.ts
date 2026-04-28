import { uuid } from '#my-zod/uuid.js';
import { describe, expect, it } from 'vitest';

describe('My Zod UUID', () => {
    describe('Single Parse', () => {
        describe('String check', () => {
            it('When input is not string, should throw error with default message', () => {
                const testString = 123;
                const zodUuid = uuid();

                expect(() => {
                    zodUuid.parse(testString);
                }).toThrow('Input must be a string');
            });

            it('When input is not string and custom message is provided, should throw error with custom message', () => {
                const testString = 123;
                const zodUuid = uuid('Custom message');

                expect(() => {
                    zodUuid.parse(testString);
                }).toThrow('Custom message');
            });
        });

        describe('Uuid check', () => {
            it('When input is uuid, should return uuid', () => {
                const testUuid = '123e4567-e89b-12d3-a456-426655440000';
                const zodUuid = uuid();

                const result = zodUuid.parse(testUuid);

                expect(result).toBe(testUuid);
            });

            it('When input is not uuid, should throw error with default message', () => {
                const zodUuid = uuid();

                expect(() => {
                    zodUuid.parse('123');
                }).toThrow('Invalid UUID');
            });

            it('When input is not uuid and custom message is provided, should throw error with custom message', () => {
                const zodUuid = uuid('Custom message');

                expect(() => {
                    zodUuid.parse('123');
                }).toThrow('Custom message');
            });
        });
    });

    describe('Multiple Parse', () => {
        it('When input is uuid with minimum length, should return uuid', () => {
            const testUuid = '123e4567-e89b-12d3-a456-426655440000';
            const zodUuid = uuid().minLength(36);

            const result = zodUuid.parse(testUuid);

            expect(result).toBe(testUuid);
        });
    });
});
