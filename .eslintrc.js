module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
  },
  overrides: [
    {
      files: ['src/**/__test__/*'],
      rules: {
        'check-file/folder-naming-convention': 'off',
      },
    },
  ],
  plugins: ['@typescript-eslint', 'check-file'],
  rules: {
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'warn',
    'check-file/folder-naming-convention': [
      'error',
      {
        'src/**/': 'KEBAB_CASE',
      },
    ],
    'check-file/filename-naming-convention': [
      'error',
      {
        '**/*.{js,ts}': 'KEBAB_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
  },
};
