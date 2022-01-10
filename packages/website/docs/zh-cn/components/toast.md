# Toast / 通知

显示重要的全局通知信息

### 默认的

基础的 `Toast` 控件

:::playground

toast/default.vue

:::

### 不同状态

:::playground

toast/status.vue

:::

### 支持静态方法

`Toast` 控件支持静态方法调用

:::playground

toast/static.vue

:::

### Toast Props

| 属性          | 描述               | 类型                | 可选值                                     | 默认      |
| ------------- | ------------------ | ------------------- | ------------------------------------------ | --------- |
| **text**      | 通知消息的文本     | `'string','number'` | `-`                                        | `-`       |
| **type**      | 通知框的主题       | `string`            | `'default', 'success', 'warning', 'error'` | `default` |
| **duration**  | 消息框的展示时间   | `'string','number'` | `-`                                        | `4500`    |
| **closeAble** | 消息框显示关闭按钮 | `boolean`           | `'true','false'`                           | `false`   |
