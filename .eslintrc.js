module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  rules: {
    'no-void': ['error', { allowAsStatement: true }]
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['standard-with-typescript', 'prettier'],
      parserOptions: {
        project: ['./tsconfig.eslint.json']
      },
      rules: {
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/method-signature-style': 0,
        '@typescript-eslint/return-await': 0
      }
    },
    {
      files: ['*.spec.ts', '*.test.ts'],
      rules: {}
    },
    {
      files: ['*.md'],
      plugins: ['markdown']
    }
  ]
}
