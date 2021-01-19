import { NuxtConfig } from '@nuxt/types'

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
      { rel: 'icon', type: 'image/x-icon', href: (routeBase ?? '') + '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // { src: '~plugins/FontAwesome', mode: 'all' },
    { src: '~plugins/NlyAdminlteVue.js', mode: 'all' }
  ],

  router: {
    base: routeBase ?? '/'
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
    '@nuxtjs/style-resources'
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
