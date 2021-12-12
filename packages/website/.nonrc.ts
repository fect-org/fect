import path from 'path'
import { markdownPlugin } from '@fect-ui/md-loader'
import { defineNonConfig } from '@fect-ui/cli'
import Prism from 'prismjs'

export default defineNonConfig({
  entry: path.join(__dirname, 'index.html'),
  plugins: [
    markdownPlugin({
      markdownOptions: {
        highlight: (str) => Prism.highlight(str, Prism.languages.javascript, 'javascript')
      }
    })
  ]
})
