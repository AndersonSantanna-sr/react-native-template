module.exports = {
  root: true,
  env: {
    es2024: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'off',
  },
  ignorePatterns: ['node_modules/', 'android/', 'ios/', '.expo/', 'build/', 'dist/', 'coverage/'],
};
