module.exports = {
  env: {
    node: true
  },
  root: true,
  parser: "vue-eslint-parser",
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: "@typescript-eslint/parser",
  },
  rules: {
    // 使用 2 个空格缩进
    "indent": ["error", 2],
    // 忽略文件名多个字符串
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "off"
  },
}
