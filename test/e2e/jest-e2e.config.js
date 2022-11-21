const testConfig = require('../jest.config');

module.exports = {
  ...testConfig,
  testRegex: '/test/e2e/.*.spec.ts',
};
