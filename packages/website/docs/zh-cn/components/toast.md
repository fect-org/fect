# Toast / 通知

显示重要的全局通知信息。

<playground title="默认的" desc="基础的Toast控件" name="ex-toast-default" />

<playground title="不同状态的" name="ex-toast-status" />

<playground title="支持静态方法" desc="Toast控件支持静态方法调用" name="ex-toast-static" />

### Toast Props

| 属性         | 描述             | 类型                | 可选值                                     | 默认      |
| ------------ | ---------------- | ------------------- | ------------------------------------------ | --------- |
| **text**     | 通知消息的文本   | `'string','number'` | `-`                                        | `-`       |
| **type**     | 通知框的主题     | `string`            | `'default', 'success', 'warning', 'error'` | `default` |
| **duration** | 消息框的展示时间 | `'string','number'` | `-`                                        | `4500`    |
