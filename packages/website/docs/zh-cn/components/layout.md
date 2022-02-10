## Layout / 布局

以简易的方式构建页面布局

### 默认的

`row` 组件可以创建一个行容器

:::playground

layout/default.vue

:::

### 列

`col` 组件可以创建不同宽度的列容器

:::playground

layout/column.vue

:::

### 间距

在 `row` 组件上指定子元素 (列) 的间距

:::playground

layout/spacer.vue

:::

### 组合

使用 1/24 列完成布局

:::playground

layout/compose.vue

:::

### 对齐

使用 `justify `与 `align` 属性以不同方式对齐列

:::playground

layout/align.vue

:::

### Row Props

| 属性        | 描述           | 类型                | 可选值                                                   | 默认    |
| ----------- | -------------- | ------------------- | -------------------------------------------------------- | ------- |
| **tag**     | 自定义容器元素 | `HTMLElemenet`      | `-`                                                      | `div`   |
| **gutter**  | 子元素列的间距 | `'string','number'` | `-`                                                      | `0`     |
| **justify** | 水平对齐方式   | `string`            | `'start','end','center','space-around','space-between',` | `start` |
| **align**   | 垂直对齐方式   | `string`            | `'top', 'middle', 'bottom'`                              | `top`   |

### Col Props

| 属性       | 描述               | 类型                | 可选值   | 默认  |
| ---------- | ------------------ | ------------------- | -------- | ----- |
| **tag**    | 自定义容器元素     | `HTMLElement`       | `-`      | `div` |
| **span**   | 每列占据的网格大小 | `'string','number'` | `'0-24'` | `24`  |
| **offset** | 当前列的偏移位置   | `'string','number'` | `-`      | `0`   |
