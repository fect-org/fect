# UseState

一个十分优雅设置 ref 值的钩子

## 代码演示

```js
import { defineComponent } from 'vue'
import { useState } from '../useState'

defineComponent({
  setup() {
    const [visible, setVisible] = useState(false)

    const clickHandler = () => setVisible(true)
  }
})
```

## API

### 类型定义

```ts

import { Ref } from 'vue'

export type SetStateAction<S> = S | ((prevState: S) => S)

export type Dispatch<T> = (val: SetStateAction<T>) => void

export function useState(initial?:T)=> [Ref<T>, Dispatch<T>]

```

### 参数

| 参数    | 说明             | 类型 |
| ------- | ---------------- | ---- |
| initial | 需要传递的初始值 | any  |
