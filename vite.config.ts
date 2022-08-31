import { defineConfig, normalizePath } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import Md from 'vite-plugin-md'
import Prism from 'prismjs'
import { playground } from './mdi/markdown'
import { table } from './mdi/table'
import path from 'path'

const external = ['@fect-ui/vue-hooks', '@fect-ui/vue-icons', 'prismjs', 'vue', 'vue-router'].reduce(
  (acc, cur) => (Object.assign(acc, { [cur]: [cur] }), acc),
  {}
)

export default defineConfig({
  root: 'docs',
  publicDir: path.join(process.cwd(), 'public'),
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
      wrapperClasses: 'doc-container',
      markdownItOptions: {
        highlight: (str) => Prism.highlight(str, Prism.languages.javascript, 'javascript')
      },
      builders: [playground(), table()]
    })
  ],
  // https://github.com/vitejs/vite/issues/5270
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  },
  build: {
    outDir: path.join(__dirname, 'dist'),
    rollupOptions: {
      output: {
        manualChunks: external
      }
    }
  }
})
