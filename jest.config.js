module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/src/'],
  collectCoverageFrom: [
    'packages/vue/components/**/*.{js,jsx,ts,tsx,vue}',
    '!packages/vue/test/**/*',
    '!packages/vue/components/utils/**',
    '!packages/vue/components/index.ts',
    '!packages/vue/components/**/type.ts',
    '!packages/vue/components/**/style.ts',
  ],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
}
