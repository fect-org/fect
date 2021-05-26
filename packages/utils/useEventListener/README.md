# useEventListner

方便的在`onMounted` 周期进行事件绑定操作,在`unmounted` 和 `deactivated` 时解绑事件。

```js
import { useEventListner } from './index'

export default {
  setup() {
    const body = document.body
    useEventListner(
      'click',
      () => {
        console.log('click body')
      },
      body
    )
  },
}
```
