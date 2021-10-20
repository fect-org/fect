# 导入

### 配置

<fe-dot type="success" />方式一:手动按需引入组件

可能在项目中您并不需要把组件全部加载进入到您的项目,`FectUI`提供了按需导入的功能。您可以选择手动按需引入组件

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import Button from '@fect-ui/vue/lib/button'
import '@fect-ui/themes'
import '@fect-ui/vue/lib/Button/index.css'

createApp(App).use(Button).mount('#app')
```

<fe-dot type="warning" />方式二:通过 babel 插件按需引入组件

babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 语句自动转换为按需引入的方式。

```shell
npm i babel-plugin-import -D
```

在.babelrc 或 babel.config.js 中添加配置：

```javascript
{
   plugins: [
    [
      'import',
     {
        libraryName: '@fect-ui/vue',
        libraryDirectory: 'es',
        style: (name) => `${name}/index.css`,
      },
    ],
  ],
}
```

<fe-dot type="warning" /> 在 Vite 项目中按需引入组件

vite-plugin-style-import 是一款类似于 babel-plugin-import 的 vite 插件
由于需要`babel`的支持所以需要在 vite 项目里面安装

<fe-snippet text="yarn add @babel/runtime -D"  width="300px" />
<fe-spacer/>
<fe-snippet text="yarn add vite-plugin-style-import -D"  width="300px" />

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: '@fect-ui/vue',
          esModule: true,
          resolveStyle: (name) => `@fect-ui/vue/es/${name}/index.css`,
        },
      ],
    }),
  ],
})
```

接着你可以在代码中直接引入 Fect 组件，插件会自动将代码转化为按需引入的形式。

```javascript
import '@fect-ui/themes'
import { Tab, Tabs } from '@fect-ui/vue'
```
