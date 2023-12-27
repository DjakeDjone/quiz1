// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [// ...
  '@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-icons', '@nuxt/image'],
  build: {
    transpile: ['vuetify', 'gsap'],
  },
  ssr: true,
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    ssr: { // if ssr enabled in future, this config is required to load vuetify properly
      noExternal: ['vuetify'],
    }
  },
  // ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'production' ? 'https://api.quiz.fri3dl.com/' : 'http://localhost:8090/'
    }
  },
  css: [
    'vuetify/lib/styles/main.css',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  devtools: {
    enabled: true
  }
})