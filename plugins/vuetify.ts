// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VSkeletonLoader, VBottomSheet, VInfiniteScroll } from 'vuetify/lib/labs/components.mjs'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import { client } from 'process'
import { useContentHandler } from '~/stores/contentHandler'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                fa,
                mdi,
            },
        },
        components: {
            ...components,
            VSkeletonLoader,
            VInfiniteScroll,
            VBottomSheet
        },
        directives,
        theme: {
            variations: {
                colors: ['primary', 'secondary'],
                lighten: 2,
                darken: 2,
            },
            defaultTheme: process.client ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 'light',
            themes: {
                light: {
                    dark: false,
                    colors: {
                        primary: '#ff8c00',
                        secondary: '#e5cef8',
                        surface: '#f6f2ee',
                        background: '#fefaf6',
                        "on-background": '#040301',
                        "on-primary": '#040301',
                        "on-secondary": '#040301',
                        "on-surface": '#040301',
                        accent: '#856f82',
                        error: '#b00020',
                        info: '#2196f3',
                        success: '#4caf50',
                        warning: '#ff9800',
                    },
                },
                dark: {
                    dark: true,
                    colors: {
                        primary: '#ff8400',
                        secondary: '#291f00',
                        accent: '#f86c30',
                        background: '#140f00',
                    },
                },
            }
        },
    })
    nuxtApp.vueApp.use(vuetify)
})
