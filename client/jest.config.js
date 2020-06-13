module.exports = {
  "preset": 'ts-jest',
  "testEnvironment": 'jsdom',
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "setupFilesAfterEnv": ['<rootDir>/src/__tests__/config/setupTests.ts'],
  "testPathIgnorePatterns": ["/src/__tests__/config/setupTests.ts"],
  "coverageDirectory": "./coverage/jest",
  "coverageReporters": ["json"]
}