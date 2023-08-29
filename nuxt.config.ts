// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    payos: {
      baseUrl: 'https://api-merchant.payos.vn',
      clientId: '',
      apiKey: '',
      checksumKey: '',
    }
  },
  devtools: { enabled: true }
})
