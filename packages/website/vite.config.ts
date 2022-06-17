import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import Prism from 'prismjs'
import { markdownPlugin } from '@fect-ui/md-loader'
import { dependencies } from './package.json'

const renderChunks = (deps: Record<string, string>) => {
  const chunks = {}
  Object.keys(deps).forEach((key) => {
    chunks[key] = [key]
  })
  return chunks
}

export default defineConfig({
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    Jsx(),
    markdownPlugin({
      markdownOptions: {
        highlight: (str) => Prism.highlight(str, Prism.languages.javascript, 'javascript')
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: { ...renderChunks(dependencies) }
      }
    }
  }
})
