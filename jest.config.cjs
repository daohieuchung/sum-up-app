module.exports = {
  projects: [
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/tests/**/*.js'],
      transform: {
        '^.+\\.js$': 'babel-jest'
      }
    },
  ]
};
