import { configDefaults, defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        // Enable globals like 'describe', 'it', 'expect' (optional)
        globals: true,
        environment: 'node',
        include: ['./src/**/*.{test,spec}.ts'],
        exclude: [
            ...configDefaults.exclude,
            'src/tests/setup.ts',
            'dist',
            'coverage',
            'src/tests/utils/*.ts',
        ], // Exclude setup file from test files
        // Setup file for environment variables or global mocks
        setupFiles: ['./src/tests/setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'src/tests/'],
        },
    },
    resolve: {
        alias: [
            {
                find: /^#(.*)/,
                replacement: path.resolve(__dirname, './src/$1'),
            },
        ],
    },
});
