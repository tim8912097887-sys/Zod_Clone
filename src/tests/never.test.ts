import { never } from '#my-zod/never.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Never', () => {
    it('When input is string, should throw error with default message', () => {
        const zodNever = never();

        expect(() => {
            zodNever.parse(123);
        }).toThrow('Expected never');
    });

    it('When input is number, should throw error with default message', () => {
        const zodNever = never();

        expect(() => {
            zodNever.parse('123');
        }).toThrow('Expected never');
    });
});
