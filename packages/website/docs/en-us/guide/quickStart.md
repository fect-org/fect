## Quick Start

## Install

<fe-snippet text="yarn add @fect-ui/vue" width="300px" />

## Usage

<fe-dot type="success" />Manually import

```js
import { createApp } from 'vue'
import App from './App.vue'
import Button from '@fect-ui/vue/lib/button'
import '@fect-ui/themes'
import '@fect-ui/vue/lib/Button/style'

createApp(App).use(Button).mount('#app')
```

<fe-dot type="success" />Import on demand

`babel-plugin-import` will automatically convert the import statement into an on-demand import method during the compilation process.

```shell
$ yarn add babel-plugin-import -D
```

```js
// in your .babelrc or babel.config.js
{
   plugins: [
    [
      'import',
     {
       libraryName: '@fect-ui/vue',
        libraryDirectory: 'es',
        style: (name) => `${name}/style/index`,
      },
    ],
  ],
}
```

```js
// then you can import component from fect
import '@fect-ui/themes'
import { Button } from '@fect-ui/vue'
```

<fe-dot type="success" />In Vite

If you are using Vite, please use `vite-plugin-style-import`.

```shell
$ yarn add vite-plugin-style-import -D
```

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: '@fect-ui/vue',
          esModule: true,
          resolveStyle: (name) => `@fect-ui/vue/es/${name}/style/index`
        }
      ]
    })
  ]
})
```

```js
// then you can import component from fect
import '@fect-ui/themes'
import { Tab, Tabs } from '@fect-ui/vue'
```

<fe-dot type="success" />Import all components

```js
import { createApp } from 'vue'
import App from './App.vue'
import Fect from '@fect-ui/vue'
import '@fect-ui/themes'
import '@fect-ui/vue/lib/main.css'

createApp(App).use(Fect).mount('#app')
```
