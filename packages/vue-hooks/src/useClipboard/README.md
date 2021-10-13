# useClipboard

剪切板

### 代码演示

```javascript
import { useClipboard } from '@fect-ui/vue-hooks'

export default {
  setup() {
    const { copyText } = useClipboard()

    const copy = () => copyText('copy test!')
  },
}
```

## API

### 类型定义

```ts
type useClipboardResult = {
  copyText: (text: string) => void
}

const useClipboard = (): useClipboardResult => {}
```

### useClipboard 返回值

| 参数     | 说明                            | 类型                  |
| -------- | ------------------------------- | --------------------- |
| copyText | useClipboard 返回的复制文本函数 | _(text:string)=>void_ |
