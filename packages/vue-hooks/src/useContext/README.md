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
    const { idx, ctx } = useProvider(READONLY_KEY)
    const { count, addCount } = ctx
    onMounted(() => {
      addCount()
      console.log(count.value) //->1
    }),
  },
}
```

## API

### 类型定义

```ts
export function createProvider(key:string|symbol)=>{
  provider:(value: any) => void
  children: ComponentPublicInstance[];
}


export function useProvider<T>(key:string|symbol)=>{
  content?:T
  idx?: Ref<number> | number
}
```

#### createProvider 创建 provider 容器

| 返回参数 | 说明             | 类型                   |
| -------- | ---------------- | ---------------------- |
| children | 子组件列表       | ----                   |
| provider | 向子组件传递参数 | _(value: any) => void_ |

#### useProvider 使用 provider 容器

_useProvider_ 支持传递第二参数类型(_(any)_)作为默认参数,当父组件没有该值的时候默认启用默认参数,用法与`inject`相同。

| 返回参数 | 说明                         | 类型       |
| -------- | ---------------------------- | ---------- |
| ctx      | 父组件提供的值               | _(any)_    |
| idx      | 当前组件在父组件中的索引位置 | _(number)_ |
