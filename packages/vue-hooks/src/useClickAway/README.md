# useClickAway

监听点击元素外部的事件

## 代码演示

```jsx
import { ref, defineComponent } from 'vue'
import { useClickAway } from '@fect-ui/vue-hooks'

defineComponent({
  setup() {
    const divRef = ref()
    useClickAway(() => {
      console.log('click')
    }, divRef)

    return () => <div ref={divRef}></div>
  },
})
```

### 自定义事件

```jsx
import { ref, defineComponent } from 'vue'
import { useClickAway } from '@fect-ui/vue-hooks'

defineComponent({
  setup() {
    const divRef = ref()
    useClickAway(
      () => {
        console.log('click')
      },
      divRef,
      {
        event: 'touch',
      }
    )

    return () => <div ref={divRef}></div>
  },
})
```

## API

```ts
export interface useClickAwayOptions {
  event?: string
}

const defaultOptions: useClickAwayOptions = {
  event: 'click',
}

const useClickAway = (
  listener: EventListener,
  target: Element | Ref<Element | undefined>,
  options = defaultOptions
): void => {}
```

### 参数

| 参数     | 说明                     | 类型                       | 默认值 |
| -------- | ------------------------ | -------------------------- | ------ |
| listener | 点击外部时触发的回调函数 | _EventListener_            | -      |
| target   | 绑定事件的元素           | _Element \| Ref\<Element>_ | -      |
| options  | 可选的配置项             | _Options_                  | 见下表 |

### options

| 参数  | 说明           | 类型     | 默认值  |
| ----- | -------------- | -------- | ------- |
| event | 监听的事件类型 | _string_ | `click` |
