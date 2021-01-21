import { NuxtConfig } from '@nuxt/types'
require('dotenv').config()

const routeBase = process.env.APP_ROUTER_BASE

const config: NuxtConfig = {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // modern: 'client',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '鲨手酒吧',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'referrer', content: 'no-referrer' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: (routeBase ?? '/') + 'favicon.ico' }
    ],
    script: [
      { src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // { src: '~plugins/FontAwesome', mode: 'all' },
    { src: '~plugins/NlyAdminlteVue', mode: 'all' },
    { src: '~plugins/LeanCloud', mode: 'all' }
  ],

  router: {
    base: routeBase ?? '/'
  },

  env: {
    appVersion: process.env.APP_VERSION ?? 'SNAPSHOT',
    appVersionUrl: process.env.APP_VERSION_URL ?? '',
    appRevision: process.env.APP_REVISION ?? '',
    leanCloudAppId: process.env.LEANCLOUD_APP_ID ?? '',
    leanCloudAppKey: process.env.LEANCLOUD_APP_KEY ?? '',
    leanCloudServerURL: process.env.LEANCLOUD_SERVER_URL ?? ''
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    ['@nuxtjs/fontawesome', {
      component: 'fa',
      icons: {
        solid: true,
        regular: true,
        brands: true
      }
    }],
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*'
      }
    },
    https: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}

export default config
