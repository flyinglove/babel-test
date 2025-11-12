import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: '页面搭建渲染端',
      meta: [
        { name: 'description', content: '基于 Nuxt 的页面搭建渲染端，支持服务端渲染与 SEO。' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' }
      ]
    }
  },
  css: ['~/assets/base.css'],
  typescript: {
    typeCheck: false,
    strict: true
  },
  components: true,
  nitro: {
    preset: 'node-server'
  }
});
