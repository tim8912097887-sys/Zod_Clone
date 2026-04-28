import { nan } from '#my-zod/nan.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Nan', () => {
    it('When input is NaN, should return value', () => {
        const testNan = NaN;
        const zodNan = nan();

        const result = zodNan.parse(testNan);

        expect(result).toBe(testNan);
    });

    it('When input is not NaN, should throw error with default message', () => {
        const zodNan = nan();

        expect(() => {
            zodNan.parse(123);
        }).toThrow('Expected NaN');
    });

    it('When input is not NaN and custom message is provided, should throw error with custom message', () => {
        const zodNan = nan('Custom message');

        expect(() => {
            zodNan.parse(123);
        }).toThrow('Custom message');
    });
});
