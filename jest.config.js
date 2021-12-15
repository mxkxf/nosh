module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
  rootDir: 'src',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
