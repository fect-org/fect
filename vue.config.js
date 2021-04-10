module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.mdx?$/,
          use: ['babel-loader', '@mdx-js/vue-loader'],
        },
      ],
    },
    output: {
      libraryExport: 'default',
    },
    performance: {
      hints: process.env.NODE_ENV === 'production' ? false : 'warning',
    },
  },
}
