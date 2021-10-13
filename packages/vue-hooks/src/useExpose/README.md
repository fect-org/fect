# UseExpose

合并子组件的属性或者事件到父组件(需要建立父子组件通信)

## 代码演示

```js
// parent

import { defineComponent } from 'vue'
import { createProvider } from '../useContext'

defineComponent({
  setup() {
    const { provider, children } = createProvider('parentKey')
    children[0].handleClick()
  },
})
```

```jsx
// chilren

import { defineComponent } from 'vue'
import { useProvider } from '../useContext'
import { useExpose } from '../useExpose'

defineComponent({
  setup() {
    useProvider('parentKey')
    const handleClick = () => console.log('hello world')
    useExpose({ handleClick })
  },
})
```

## API

### 类型定义

```ts

export function useExpose(merge:Record<string, any>)=>void

```

### 参数

| 参数  | 说明           | 类型                                |
| ----- | -------------- | ----------------------------------- |
| merge | 需要传递的属性 | _(merge:Record<string, any>)=>void_ |
