import type { Config } from 'jest';
import nextJest from 'next/jest';

export const baseConfig = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'ts', 'json'],
    testEnvironment: 'jsdom',
} as const satisfies Config;


const createJestConfig = nextJest({
    dir: './',
});

const config = {
    ...baseConfig,
    moduleFileExtensions: [...baseConfig.moduleFileExtensions, 'jsx', 'tsx'],
} as const satisfies Config;

export default createJestConfig(config);
