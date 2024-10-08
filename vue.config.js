const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:50000',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
      }
    }
  }
})
