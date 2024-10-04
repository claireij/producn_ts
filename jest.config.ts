module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleNameMapper: {
    "^@api_models/(.*)$": "<rootDir>/lib/api_models/$1",
    "^@api/(.*)$": "<rootDir>/pages/api/$1",
  },
}
