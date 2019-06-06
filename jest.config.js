const transformIgnorePatterns = [
  '/dist/',
  'node_modules\/[^/]+?\/(?!(es|node_modules)\/)', // Ignore modules without es dir
];


module.exports = {
  setupFiles: [
    './__tests__/setup.ts'
  ],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "\\.(png|svg)$": "<rootDir>/src/"
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/preview/',
    './__tests__/setup.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns
};
