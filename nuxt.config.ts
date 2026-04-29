import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'

import 'dotenv/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // CORE SETTINGS
  compatibilityDate: '2024-11-13',

  // GLOBAL SETTINGS
  nitro: {
    prerender: {
      failOnError: false,
    },
    vercel: {
      functions: {
        maxDuration: 30,
      },
    },
  },

  app: {
    head: {
      title: process.env.SITE_NAME,
    },
  },

  experimental: {
    renderJsonPayloads: true,
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
      legacy({
        modernTargets: ['>0.5% in CH', 'last 2 versions', 'Firefox ESR', 'not dead'],
        renderLegacyChunks: false,
        renderModernChunks: true,
        polyfills: true,
        modernPolyfills: true,
      }),
    ],
    server: {
      allowedHosts: ['.novu.io', process.env.APP_URL!.split('://')[1]],
    },
  },

  runtimeConfig: {
    public: {
      SITE_NAME: process.env.SITE_NAME,

      APP_URL: process.env.APP_URL,

      BACKEND_URL: process.env.BACKEND_URL,
      API_URL: process.env.API_URL,
      GQL_HOST: process.env.GQL_HOST,
      GQL_APQ_ENABLED: process.env.GQL_APQ_ENABLED === 'true',

      CLOUDINARY_BASE_URL: process.env.CLOUDINARY_BASE_URL,
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-security',
  ],
  i18n: {
    baseUrl: process.env.APP_URL,
    defaultLocale: 'de',
    langDir: 'lang/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'i18n_redirected',
    //   redirectOn: 'root',
    // },
    locales: [
      {
        code: 'de',
        name: 'Deutsch',
        language: 'de-CH', // this is your html lang
        file: 'cms.ts',
      },
      {
        code: 'fr',
        name: 'Français',
        language: 'fr-CH',
        file: 'cms.ts',
      },
    ],
  },

  security: {
    headers: {
      // enable CSP for larger projects
      contentSecurityPolicy: {
        'base-uri': ['\'none\''],
        'font-src': ['\'self\'', 'https:', 'data:'],
        'form-action': ['\'self\'', 'https:'],
        'frame-ancestors': ['\'self\'', process.env.BACKEND_URL || ''],
        'connect-src': ['\'self\'', 'https:', 'data:', 'blob:'],
        'img-src': ['\'self\'', 'https:', 'data:', 'blob:'],
        'object-src': ['\'self\'', 'https:', 'data:'],
        'script-src-attr': ['\'none\''],
        'style-src': ['\'self\'', 'https:', '\'unsafe-inline\''],
        'script-src': [
          '\'self\'',
          'https:',
          '\'unsafe-inline\'',
          '\'nonce-{{nonce}}\'',
        ],
        'upgrade-insecure-requests': true,
      },
      // disable includeSubdomains as it is risky as a default for the skeleton
      strictTransportSecurity: {
        includeSubdomains: false,
        maxAge: 15552000,
      },
      // let browser handle prefetching
      xDNSPrefetchControl: false,
    },
    rateLimiter: false,
    removeLoggers: false,
  },

  // COMPONENTS
  // We do not want global to be set to true for all components: https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
  // Instead, it can be set on a per-directory basis or the components can be resolved in their respective loader-components.
  // Global should only be set to true for components used through <Component :is="..." />. (Blueprints, Heroes, and Statamic-Components in our case)
  components: {
    dirs: [
      {
        path: '~/components/cms/loaders',
        pathPrefix: false,
      },
      {
        path: '~/components/cms/blueprints',
        global: true,
        pathPrefix: false,
      },
      {
        path: '~/components/cms/components',
        global: true,
        pathPrefix: false,
      },
      {
        path: '~/components/cms/heroes',
        global: true,
        pathPrefix: false,
      },
      {
        path: '~/components/cms/navigation',
        pathPrefix: false,
      },
      {
        path: '~/components/ui',
        pathPrefix: false,
      },
      {
        path: '~/components/ui/components',
        pathPrefix: false,
      },
      {
        path: '~/components/ui/heroes',
        pathPrefix: false,
      },
      {
        path: '~/components/utils',
        pathPrefix: false,
      },
    ],
  },

  routeRules: {
    '/cms': {
      redirect: `${process.env.BACKEND_URL}/cp`,
    },
    '/sitemap.xml': {
      redirect: `${process.env.BACKEND_URL}/sitemap.xml`,
    },
  },
})
