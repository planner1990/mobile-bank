export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: process.env.VUE_APP_NAME,
    htmlAttrs: {
      lang: process.env.VUE_APP_I18N_LOCALE
    },
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: 'پیشخوان موبایل بانک :: بانک قرض الحسنه مهر ایران' },
      { hid: 'keywords', name: 'keywords', content: 'پیشخوان, موبایل بانک, بانک قرض الحسنه مهر ایران, بانک قرض الحسنه, مهرایران' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'subject', content: 'پیشخوان موبایل بانک :: بانک قرض الحسنه مهر ایران' },
      { name: 'copyright', content: '2015 - 2025' },
      { name: 'language', content: 'fa' },
      { name: 'document-type', content: 'Public' },
      { name: 'document-rating', content: 'General' },
      { name: 'content-language', content: 'document' },
      { 'http-equiv': 'content-language', content: 'fa' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
      { hid: 'MetaGenerator', name: 'GENERATOR', content: 'DotNetNuke' },
      { name: 'mobile-web-app-capable', content: 'yes' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: process.env.VUE_APP_BASE_ROUTE + 'favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // Plugins
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/axios', mode: 'client' },
    { src: '~/plugins/select2' },

    // filters
    { src: '@/filters/filterMomentJalali' },
    { src: '@/filters/filterNumberSeparator' },
    { src: '@/filters/filterConvertMomentJalaliToTimestamp' },
    { src: '@/filters/filterIbanReplace' },
    { src: '@/filters/filterMobile98Replace' },
    { src: '@/filters/filterConvertNumberPersianToEnglish' },
    { src: '@/filters/filterCardReplace' },
    { src: '@/filters/filterTimeStampToMomentJalali' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/eslint-module', {
      fix: true
    }],
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],
  axios: {
    baseURL: process.env.VUE_APP_Host
  },
  env: {
    VUE_APP_I18N_LOCALE: process.env.VUE_APP_I18N_LOCALE,
    VUE_APP_I18N_FALLBACK_LOCALE: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
    VUE_APP_BASE_ROUTE: process.env.VUE_APP_BASE_ROUTE,
    VUE_APP_NAME: process.env.VUE_APP_NAME,
    VUE_APP_Host: process.env.VUE_APP_Host
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '@/plugins/vuetify.options.js'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    base: process.env.VUE_APP_BASE_ROUTE
  },

  server: {
    port: 8003,
    host: '0.0.0.0' // for publish
    // host: '127.0.0.1' // for develop
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    // }
  }
}
