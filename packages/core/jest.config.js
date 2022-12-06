module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/es/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx,vue}',
    '!src/utils/**',
    '!src/index.ts',
    '!src/**/type.ts',
    '!src/**/style.ts',
    '!src/**/interface.ts',
    '!src/back-top/**',
    '!src/affix/**'
  ],
  collectCoverage: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/tests/unit/**/*.spec.[jt]s?(x)', '**/__tests__/*.[jt]s?(x)'],
  testURL: 'http://localhost/',
  testTimeout: 20000
}
