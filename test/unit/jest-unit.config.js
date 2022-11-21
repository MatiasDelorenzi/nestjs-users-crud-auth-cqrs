const testConfig = require('../jest.config.js');

module.exports = {
  ...testConfig,
  testRegex: '/test/unit/.*.spec.ts',
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: './test/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.node/',
    '/jest/',
    'src/main.ts',
    'src/models',
    'src/app.module.ts',
    'src/database.ts',
  ],
  collectCoverageFrom: ['src/**'],
};
