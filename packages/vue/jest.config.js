module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/es/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx,vue}',
    '!src/utils/**',
    '!src/index.ts',
    '!src/**/type.ts',
    '!src/**/style.ts',
    '!src/**/interface.ts',
    '!src/back-top/**'
  ],
  collectCoverage: true,
  preset: '@fect-ui/cli/lib/config',
  testTimeout: 20000
}
