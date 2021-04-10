const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  productionSourceMap: false,
  publicPath: './',
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
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
          docs: {
            name: 'chunk-docs',
            test: resolve('docs/example'),
            minChunks: 1, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: {
        name: 'single',
      },
    },
  },
}
