module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/src/'],
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,vue}',
    '!packages/utils/**/*',
    '!packages/index.js',
  ],
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
}
