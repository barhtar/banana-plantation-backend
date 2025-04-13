import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts', 'node'],
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  testEnvironment: 'node',
};

export default config;
