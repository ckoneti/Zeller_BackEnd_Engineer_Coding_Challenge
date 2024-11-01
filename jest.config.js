module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(tsx?|ts?)$',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: process.env.CI ? ['cobertura', 'json-summary', 'lcov'] : ['text', 'lcov'],
    globals: {
        'ts-jest': {
            diagnostics: false,
            tsconfig: './tsconfig.json',
        },
    },
};