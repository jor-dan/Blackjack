module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/all',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'jest/lowercase-name': ['error', { ignore: ['describe'] }],
    'jest/no-hooks': ['error', { allow: ['beforeEach'] }],
    'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': ['warn', { allowAfterThis: true }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['webpack.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
