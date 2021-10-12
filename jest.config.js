module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/src/'],
  collectCoverageFrom: [
    'packages/vue/**/*.{js,jsx,ts,tsx,vue}',
    '!packages/vue/utils/**/*',
    '!packages/index.ts',
    '!packages/vue/**/type.ts',
    '!packages/vue/**/style.ts',
  ],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
}
