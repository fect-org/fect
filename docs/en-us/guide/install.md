---
title: Install
name: Install
group: GETTING STARTED
index: 1
---

### Setup

Ensure your have the latest <fe-link color href="https://nodejs.org/en/">NodeJS</fe-link>, and pacakge mangaer:`NPM` or `Yarn`.

<h4>
    <fe-dot type="success">Install</fe-dot>
</h4>

<fe-tabs hide-divider hide-border class="install-tab">
    <fe-tab title="Yarn">
        <fe-snippet text="yarn add @fect-ui/vue" />
    </fe-tab>
    <fe-tab title="Npm">
        <fe-snippet text="npm install @fect-ui/vue" />
    </fe-tab>
</fe-tabs>
<fe-spacer :y="0.5"/>
<h4>
    <fe-dot type="success">Import</fe-dot>
</h4>

<fe-code block name="src/main.js">

```js
import { createApp } from 'vue'
import App from './App.vue'
import Fect from '@fect-ui/vue'
import '@fect-ui/themes'
import '@fect-ui/vue/dist/cjs/main.css'

createApp(App).use(Fect).mount('#app')
```

</fe-code>

<h4>
    <fe-dot type="success">Usage</fe-dot>
</h4>

<fe-code block name="vite.config.js">

```js
import { defineConfig } from 'vite'
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    createStyleImportPlugin({
      libraryName: '@fect-ui/vue',
      esModule: true,
      resolveStyle: (name) => {
        return `@fect-ui/vue/dist/esm/${name}/style`
      }
    })
  ]
})
```

</fe-code>

### Server Side Render

- [SSR](https://github.com/fect-org/example/tree/master/nuxt-getting-stared)
