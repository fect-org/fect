---
title: 安装
name: Install
group: '快速上手'
index: 10
---

### 配置

请确保你的 <fe-link href="https://nodejs.org/en/">NodeJS</fe-link>处于高版本(>=10),同时还需准备包管理器`NPM`或者`Yarn`。

<h4>
    <fe-dot type="success">安装依赖</fe-dot>
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
    <fe-dot type="success">添加引用</fe-dot>
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
    <fe-dot type="success">按需引入</fe-dot>
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

- [SSR](https://github.com/fect-org/example/tree/master/nuxt-getting-stared)
