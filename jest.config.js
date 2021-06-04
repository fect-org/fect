module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/lib/',
    '/src/',
    '/packages/',
  ],
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,vue}',
    '!packages/utils/**/*',
    '!packages/index.js',
  ],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
}
