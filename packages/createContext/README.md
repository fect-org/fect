# createContext

建立父子组件通信,基于 vue3 的`provide`和`inject`实现

## 代码演示

### 基本用法

```javascript
//parent.vue

import { ref } from 'vue'
import { createProvider } from '../createContext'

const READONLY_KEY = 'componentsKey'

export default {
  setup() {
    const { children, provider } = createProvider(READONLY_KEY)
    const count = ref(0)
    const addCount = (count.value += 1)
    provider({ count, addCount })
  },
}
```

```javascript

//child.vue

import { useProvider } from '../createContext'

const READONLY_KEY = 'componentsKey'

export default {
  setup() {
    const { idx, ctx } = createProvider(READONLY_KEY)
    const { count, addCount } = ctx
    onMounted(() => {
      addCount()
      console.log(count.value) //->1
    }),
  },
}
```

### API 说明

#### createProvider 创建 provider 容器

| 参数     | 说明             | 类型                   |
| -------- | ---------------- | ---------------------- |
| children | 子组件列表       | ----                   |
| provider | 像子组件传递参数 | _(value: any) => void_ |

#### useProvider 使用 provider 容器

| 参数 | 说明                         | 类型       |
| ---- | ---------------------------- | ---------- |
| ctx  | 父组件提供的值               | _(any)_    |
| idx  | 当前组件在父组件中的索引位置 | _(number)_ |
