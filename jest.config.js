// jest.config.js
export const testEnvironment = "jsdom";
export const setupFilesAfterEnv = ["@testing-library/jest-dom"];
export const moduleNameMapper = {
  "^@/(.*)$": "<rootDir>/src/$1",
  "^@components/(.*)$": "<rootDir>/src/components/$1",
  "^@styles/(.*)$": "<rootDir>/src/styles/$1",
  "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  "^@types/(.*)$": "<rootDir>/src/types/$1",
  "^@context/(.*)$": "<rootDir>/src/context/$1",
  "\\.(scss|css|sass)$": "identity-obj-proxy",
};
export const transform = {
  "^.+\\.(ts|tsx)$": "ts-jest",
};
export const testMatch = ["<rootDir>/__tests__/**/*.(spec|test).[jt]s?(x)"];
// jest.setup.js
