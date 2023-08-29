// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      payos: {
        baseUrl: 'https://api-merchant.payos.vn',
        clientId: '',
        apiKey: '',
        checksumKey: '',
      },
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxthq/ui'],
})
