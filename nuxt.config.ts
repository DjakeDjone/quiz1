// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        // ...
        '@pinia/nuxt',
        'nuxt-icons',
      ],
      ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'production' ? 'https://api.quiz.fri3dl.com/' : 'http://localhost:8090/'
    }
  },
})
