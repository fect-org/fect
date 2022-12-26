import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import Md from 'vite-plugin-md'
import { cdn } from 'vite-plugin-cdn2'
import Prism from 'prismjs'
import path from 'path'
import { playground } from './plugins/mdi/markdown'
import { table } from './plugins/mdi/table'
import { loadStaticMarkdonModule } from './plugins/vite/loader'

const external = ['@fect-ui/vue-hooks', '@fect-ui/vue-icons'].reduce(
  (acc, cur) => (Object.assign(acc, { [cur]: [cur] }), acc),
  {}
)

export default defineConfig({
  root: 'docs',
  publicDir: path.join(process.cwd(), 'public'),
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
    }),
    loadStaticMarkdonModule(),
    {
      ...cdn({
        isProduction: true,
        modules: [
          {
            name: 'vue',
            global: 'Vue'
          },
          {
            name: 'prismjs',
            global: 'Prism',
            spare: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.js'
          },
          {
            name: 'vue-router',
            global: 'VueRouter'
          }
        ]
      }),
      apply: 'build'
    }
  ],
  // https://github.com/vitejs/vite/issues/5270
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  },
  build: {
    emptyOutDir: true,
    outDir: path.join(__dirname, 'dist'),
    rollupOptions: {
      output: {
        manualChunks: external
      }
    }
  }
})
