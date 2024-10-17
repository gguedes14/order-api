import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/migrations/', '/src/model/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/migrations/'],
};

export default config;
