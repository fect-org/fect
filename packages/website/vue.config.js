const Prism = require('prismjs')
const { join } = require('path')

module.exports = {
  productionSourceMap: false,
  parallel: false,
  configureWebpack: {
    entry: join(__dirname, 'src', 'main.ts'),
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
                    'javascript'
                  )
                },
              },
            },
          ],
        },
      ],
    },
    performance: {
      hints: process.env.NODE_ENV === 'production' ? false : 'warning',
    },
  },
}
