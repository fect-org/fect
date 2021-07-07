const Prism = require('prismjs')

module.exports = {
  productionSourceMap: false,
  parallel: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.md$/,
          use: [
            'vue-loader',
            {
              loader: '@fect-ui/markdown-loader',
              options: {
                highlight: (str) => {
                  return Prism.highlight(
                    str,
                    Prism.languages.javascript,
                    'javascript',
                  )
                },
              },
            },
          ],
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
