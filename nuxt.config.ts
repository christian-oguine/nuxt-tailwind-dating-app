// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Router configuration to prevent SSR issues
  router: {
    options: {
      hashMode: false
    }
  },
  
  // SSR configuration
  ssr: true,
  
  // Experimental features for better Nuxt 4 compatibility
  experimental: {
    payloadExtraction: false
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@nuxt/image'
  ],

  googleFonts: {
    families: {
      Montserrat: true,
    },
  },
})