module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'standard', 'standard-jsx', 'standard-react'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0
  }
}
