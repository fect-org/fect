const { join } = require('path')
const Markdown = require('vite-plugin-md')

module.exports = {
  entry: join(__dirname, 'index.html'),
  plugins: [Markdown.default()],
}
