# userEventListener

事件侦听器

## 代码演示

```jsx
import { ref, defineComponent } from 'vue'
import { useEventListener } from '@fect-ui/vue-hooks'

defineComponent({
  setup() {
    const divRef = ref()
    useEventListener(
      'click',
      () => {
        console.log('click')
      },
      divRef
    )

    return () => <div ref={divRef}></div>
  },
})
```

## 类型定义

```ts
export type UseEventListenerOptions = {
  target?: EventTarget | Ref<EventTarget | undefined>
}

const useEventListener = (
  event: string,
  listener: EventListener,
  options: UseEventListenerOptions = {}
): void => {}
```

### 参数

| 参数     | 说明                     | 类型            | 默认值 |
| -------- | ------------------------ | --------------- | ------ |
| event    | 监听的事件类型           | _string_        | -      |
| listener | 点击外部时触发的回调函数 | _EventListener_ | -      |
| options  | 可选的配置项             | _Options_       | 见下表 |

### options

| 参数   | 说明     | 类型          | 默认值   |
| ------ | -------- | ------------- | -------- |
| target | 事件目标 | _EventTarget_ | `window` |
