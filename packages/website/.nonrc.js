const { join } = require('path')
const { markdownPlugin } = require('@fect-ui/md-loader')
const Prism = require('prismjs')

module.exports = {
  entry: join(__dirname, 'index.html'),
  plugins: [
    markdownPlugin({
      markdownOptions: {
        highlight: (str) => Prism.highlight(str, Prism.languages.javascript, 'javascript'),
      },
    }),
  ],
}
