module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        'standard',
    ],
    plugins: [
        'json-format',
    ],
    settings: {
        'json/sort-package-json': false,
        'json/json-with-comments-files': [],
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 12,
        babelOptions: {
            configFile: './babel.config.js',
        },
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': [
            'error',
            { anonymous: 'always', named: 'never', asyncArrow: 'always' },
        ],
    },
};
