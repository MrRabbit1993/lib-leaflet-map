module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020
  },
  rules: {
    'no-unused-vars': [2], // 0关闭 1警告 2错误
    '@typescript-eslint/no-unused-vars': [1],
    '@typescript-eslint/no-var-requires': [0]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
