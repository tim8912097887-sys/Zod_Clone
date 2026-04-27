import { MyZodError } from '#my-zod/error.js';
import { describe, expect, it } from 'vitest';

describe('My Zod Error', () => {
    it('should have message stringify from issues array in the error object', () => {
        const issues = [
            { message: 'Invalid input', path: ['test'] },
            { message: 'Invalid input', path: ['test'] },
        ];

        expect(() => {
            throw new MyZodError(issues);
        }).toThrow(JSON.stringify(issues));
    });
});
