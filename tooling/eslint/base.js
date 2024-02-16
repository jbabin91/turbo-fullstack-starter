/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  env: { browser: true, es2022: true, node: true },
  extends: [
    'turbo',
    'eslint:recommended',
    'plugin:tailwindcss/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  ignorePatterns: ['node_modules', 'dist', '.turbo'],
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
      },
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          { fixStyle: 'inline-type-imports', prefer: 'type-imports' },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: { attributes: false } },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
      },
    },
    {
      extends: [
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      files: ['*.jsx', '*.tsx'],
      plugins: ['react', 'react-refresh'],
      rules: {
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        'react/jsx-sort-props': [
          'error',
          {
            callbacksLast: true,
            ignoreCase: true,
            noSortAlphabetically: false,
            reservedFirst: true,
            shorthandFirst: true,
            shorthandLast: false,
          },
        ],
      },
    },
  ],
  plugins: ['import', 'simple-import-sort', 'sort-keys-fix'],
  reportUnusedDisableDirectives: true,
  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': ['error', { 'prefer-inline': true }],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
    'tailwindcss/no-custom-classname': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};

module.exports = eslintConfig;