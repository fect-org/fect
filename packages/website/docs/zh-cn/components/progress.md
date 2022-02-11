## Progress / 进度条

展示事件或与之相关的任务进展

### 默认的

使用插槽定制按钮

:::playground

progress/default.vue

:::

### 类型

我们预置了一些不同风格的进度条

:::playground

progress/types.vue

:::

### 动态色彩

你可以指定进度条在任何范围内的颜色

:::playground

progress/colors.vue

:::

### Progress Props

| 属性       | 描述               | 类型                        | 可选值                                     | 默认      |
| ---------- | ------------------ | --------------------------- | ------------------------------------------ | --------- |
| **value**  | 进度条当前数值     | `number`                    | `-`                                        | `0`       |
| **max**    | 最大值             | `'number','string'`         | `-`                                        | `100`     |
| **colors** | 在范围内自定义颜色 | `{ [key: number]: string }` | `-`                                        | `{}`      |
| **type**   | 预定义的状体类型   | `'string'`                  | `'default', 'success', 'warning', 'error'` | `default` |
