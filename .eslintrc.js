// eslint-disable-next-line no-undef
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 6,
    },
    env: {
        es6: true,
        node: true,
    },
};
