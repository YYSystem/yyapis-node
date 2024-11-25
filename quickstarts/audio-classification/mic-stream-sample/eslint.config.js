const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const eslintConfigPrettier = require('eslint-config-prettier')

module.exports = [
  {ignores: ['eslint.config.js', 'protos', 'node_modules', 'lib']},
  ...tseslint.config([
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    eslintConfigPrettier,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: __dirname,
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      },
    },
    {
      files: ['**/*.js'],
      extends: [tseslint.configs.disableTypeChecked],
      languageOptions: {sourceType: 'commonjs'},
    },
  ]),
]
