/***
 * may will use ts-jest . test .ts|.tsx file
 * see : https://kulshekhar.github.io/ts-jest/docs/babel7-or-ts/
 * see : https://github.com/nrwl/nx/issues/1720
 */

import { Config } from '@jest/types'

const DEFAULT_CONFIG: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/tests/unit/**/*.spec.[jt]s?(x)', '**/__tests__/*.[jt]s?(x)'],
  testURL: 'http://localhost/',
}

export default DEFAULT_CONFIG
