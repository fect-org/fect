const { join } = require('path')
const { markdownPlugin } = require('@fect-ui/md-loader')

module.exports = {
  entry: join(__dirname, 'index.html'),
  plugins: [markdownPlugin()],
}
