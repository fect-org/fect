module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  root: true,
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'kagura'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/require-default-prop': 0,
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
