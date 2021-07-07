# 导入

### 配置

<fe-dot type="success" />方式一:手动按需引入组件

可能在项目中您并不需要把组件全部加载进入到您的项目,`FectUI`提供了按需导入的功能。您可以选择手动按需引入组件

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { Button } from '@fect-ui/vue'
import '@fect-ui/themes/main.css'
import '@fect-ui/vue/lib/Button/index.css'

createApp(App)
  .use(Button)
  .mount('#app')
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
        libraryDirectory: 'lib',
        style: (name) => `${name}/index.css`,
      },
    ],
  ],
}
```

接着你可以在代码中直接引入 Fect 组件，插件会自动将代码转化为按需引入的形式

```javascript
import '@fect-ui/themes/main.css'
import { Tab, Tabs } from '@fect-ui/vue'
```
