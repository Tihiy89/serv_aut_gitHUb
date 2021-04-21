module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'no-undef': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'warn',
    'space-unary-ops': [
      2,
      {
        'words': true,
        'nonwords': false,
      },
    ],
    'semi': [
      1,
      'always',
    ],
    'comma-dangle': [
      'warn',
      'always-multiline',
    ],
    'no-trailing-spaces': ['warn'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
  },
};
