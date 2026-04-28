import { unknown } from '#my-zod/unknown.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Unknown', () => {
    it('When input is string, should return string', () => {
        const testUnknown = 'test';
        const zodUnknown = unknown();

        const result = zodUnknown.parse(testUnknown);

        expect(result).toBe(testUnknown);
    });

    it('When input is number, should return number', () => {
        const testUnknown = 123;
        const zodUnknown = unknown();

        const result = zodUnknown.parse(testUnknown);

        expect(result).toBe(testUnknown);
    });
});
