# mountComponent

将组件注入到根节点

## 代码演示

```javascript
import { mountComponent } from './index'
import Toast from './toast'
const FectToast = (time, ...args) => {
  const { instance, unmount } = mountComponent(Toast, ...args)
  instance()
  setTimeout(() => {
    unmount()
  }, time)
}

export default FectToast
```

### API 说明

### mountComponent 将组件注入一个 div 节点将独立于`id=app`

| 返回参数  | 说明                                               | 类型                   |
| --------- | -------------------------------------------------- | ---------------------- |
| instance  | 注册节点                                           | _()=>void_             |
| unmount   | 传入`node`卸载节点,`node`节点默认为`document.body` | _(node:Element)=>void_ |
| mountNode | 创建的节点容器                                     | _(node:Element)_       |  |
