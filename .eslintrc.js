module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-plusplus': ['warn', { 'allowForLoopAfterthoughts': true }],
    'no-underscore-dangle': ['warn', { 'allowAfterThis': true }],
    'react/jsx-filename-extension': ['warn', { 'extensions': ['.jsx', '.tsx'] }],
    'react/prop-types': 'off',
  },
  overrides: [
    {
      'files': ['webpack.config.js'],
      'rules': {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
