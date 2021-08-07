module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/src/'],
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,ts,tsx,vue}',
    '!packages/utils/**/*',
    '!packages/index.ts',
    '!packages/**/type.ts',
    '!packages/**/style.ts',
  ],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
}
