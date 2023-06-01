module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    rules: {
        // TypeScript-specific rules
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    
        // Node.js-specific rules
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-missing-import': ['error', {
          'tryExtensions': ['.js', '.json', '.ts']
        }],
    
        // General best practices
        'no-console': ['error', { 'allow': ['warn', 'error'] }],
        'no-else-return': 'error',
        'no-empty-function': 'error',
        'no-magic-numbers': ['error', { 'ignore': [0, 1], 'ignoreArrayIndexes': true }],
        'no-return-await': 'error',
        'no-unused-expressions': 'error',
        'no-unused-vars': 'off',
        'prefer-const': 'error',
        'require-await': 'error',
        'semi': ['error', 'always'],
        'strict': ['error', 'global']
      }
};