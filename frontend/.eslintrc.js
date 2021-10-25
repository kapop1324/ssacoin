/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    "react/jsx-props-no-spreading": 0,
    "dollar-sign/dollar-sign": 0,
    "react/no-array-index-key": 0,
    "no-console": 0,
    "react/destructuring-assignment": 0,
    'react/button-has-type': 0,
    "import/no-named-as-default": 0
  },
};
