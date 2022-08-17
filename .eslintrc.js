module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "object-shorthand": 0,
    "no-new":0,
    "vue/valid-v-slot": 0,
    "vue/no-use-v-if-with-v-for": 0
  }
}
