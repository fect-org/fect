import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  root: 'docs',
  plugins: [
    Jsx(),
    Vue({
      include: [/\.vue$/, /\.md$/]
    })
  ]
})
