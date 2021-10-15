module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['./**/*.js'],
    coverageReporters: ['json', 'html'],
    coverageThreshold: {
        global: {
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90,
        },
    },
    modulePathIgnorePatterns: [
        'jest.config.js',
        'coverage',
    ]
}
