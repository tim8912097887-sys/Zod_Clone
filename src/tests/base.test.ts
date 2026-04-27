import { describe, expect, it } from 'vitest';
import { MyZodType } from '../my-zod/base.js';

describe('base', () => {
    it('parse should throw error if input is not string', () => {
        const parseValue = 78;
        const myZodType = new MyZodType();
        expect(myZodType).toBeDefined();
        expect(() => myZodType.parse(parseValue)).toThrow('Invalid input');
    });

    it('parse should return input if input is string', () => {
        const parseValue = 'test';
        const myZodType = new MyZodType();
        expect(myZodType).toBeDefined();
        expect(myZodType.parse(parseValue)).toBe(parseValue);
    });

    it('safeParse should return input if input is string', () => {
        const parseValue = 'test';
        const myZodType = new MyZodType();
        expect(myZodType).toBeDefined();
        expect(myZodType.safeParse(parseValue)).toEqual({
            success: true,
            data: parseValue,
        });
    });

    it('safeParse should return error if input is not string', () => {
        const parseValue = 78;
        const myZodType = new MyZodType();
        expect(myZodType).toBeDefined();
        expect(myZodType.safeParse(parseValue)).toEqual({
            success: false,
            error: 'Invalid input',
        });
    });
});
