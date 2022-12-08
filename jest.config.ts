// Defaults config see
// https://jestjs.io/docs/configuration/

import type { Config } from 'jest'

const config: Config = {
  // A list of paths to directories that jest should use to search for files in.
  roots: ['packages/'],
  testEnvironment: '@happy-dom/jest-environment',
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true
          },
          experimental: {
            plugins: [['swc-plugin-vue-jsx', {}]]
          }
        }
      }
    ]
  },
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/packages/**/*/*.spec.[tj]s?(x)'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|less)$':
      'internal/__mocks__/file-mock.js'
  },
  collectCoverage: true,
  collectCoverageFrom: ['packages/*/src/**/*.{js,jsx,ts,tsx}'],
  // Todo. for ci. after v2 will change it. Don't be forget.
  coveragePathIgnorePatterns: [
    'packages/icons/',
    'packages/hooks/',
    'packages/core/src/index.ts',
    'packages/core/src/back-top/',
    'packages/core/src/affix/',
    'packages/core/src/snippet/',
    'packages/core/src/swipe/'
  ]
}

export default config
