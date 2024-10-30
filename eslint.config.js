import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['dist'], // Ignore the 'dist' folder
    },
    {
        files: ['**/*.{ts,tsx}'], // Target TypeScript files
        languageOptions: {
            ecmaVersion: 2020,
            parser: tsParser, // Use the TypeScript parser
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': tseslint, // Include TypeScript ESLint plugin
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
];
