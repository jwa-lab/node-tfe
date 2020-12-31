module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 300000,
  testMatch: ['**/e2e/**/?(*.)+(spec|test).[jt]s?(x)'],
  modulePathIgnorePatterns: ['dist'],
};
