module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-',
      pages: 'src/views/pages',
      importPrefix: '@/views/pages/',
      nested: true
    }
  }
}
