import { markdownPlugin } from '@fect-ui/md-loader'
import { defineNonConfig } from '@fect-ui/cli'
import Prism from 'prismjs'
import { dependencies } from './package.json'

const renderChunks = (deps: Record<string, string>) => {
  const chunks = {}
  Object.keys(deps).forEach((key) => {
    chunks[key] = [key]
  })
  return chunks
}

export default defineNonConfig({
  plugins: [
    markdownPlugin({
      markdownOptions: {
        highlight: (str) => Prism.highlight(str, Prism.languages.javascript, 'javascript')
      }
    })
  ],
  viteConfigure: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            ...renderChunks(dependencies)
          }
        }
      }
    }
  }
})
