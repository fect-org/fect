import { defineConfig, normalizePath } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import Md from 'vite-plugin-md'
import Prism from 'prismjs'

const internalMarkdownParser = (code: string) => {
  return code
}

export default defineConfig({
  root: 'docs',
  // https://vitejs.dev/config/shared-options.html#define
  define: {
    defaultWd: JSON.stringify(normalizePath(process.cwd()))
  },
  plugins: [
    Jsx(),
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    /**
     * From vite-plugin-md we can define the custom frontmatter.
     * docs: https://github.com/yankeeinlondon/meta-builder
     */
    Md({
      markdownItOptions: {
        highlight: (str) => Prism.highlight(str, Prism.languages.javascript, 'javascript')
      },
      transforms: {
        after: internalMarkdownParser
      }
    })
  ],
  // https://github.com/vitejs/vite/issues/5270
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  }
})
