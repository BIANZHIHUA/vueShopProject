module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 0,
    'semi': 0,
    'no-trailing-spaces': 0,
    'space-before-function-paren': 0,
    'space-before-function-paren': 0,
    'quotes': 0,
    'comma-dangle': 0,
    'import/no-duplicates': 0,
    'quote-props': 0,
    'object-property-newline': 0,
    'eol-last': 0,
    'object-property-newline': 0,
    "no-use-v-if-with-v-for": 0
  }
}
