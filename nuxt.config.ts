import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: { port: 5173 },

  app: {
    baseURL: '/',
    head: {
      title: "Covium's Stuff",
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-96x96.png',
          sizes: '96x96',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        {
          rel: 'icon',
          type: 'shortcut icon',
          href: '/favicon.ico',
        },
        {
          rel: 'icon',
          type: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
      meta: [{ name: 'apple-mobile-web-app-title', content: "Covium's" }],
    },
  },
  ssr: false,

  modules: [
    '@nuxt/devtools',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    'nuxt-color-picker',
  ],
  vite: { plugins: [tailwindcss()] },
  css: ['~/assets/css/main.css', '~/assets/css/color-picker.css'],
  fonts: {
    families: [
      {
        name: 'Varela Round',
        provider: 'google',
      },
      {
        name: 'Varela',
        provider: 'google',
      },
      {
        name: 'Sono',
        provider: 'google',
      },
    ],
  },
});
