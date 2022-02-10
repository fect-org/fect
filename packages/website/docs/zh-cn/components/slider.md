## Slider / 滑动输入

### 默认的

展示当前值与一个可输入范围

:::playground

slider/default.vue

:::

### 步长

不同粒度的滑块

:::playground

slider/step.vue

:::

### 范围

手动指定最大值或最小值

:::playground

slider/range.vue

:::

### Slider Props

| 属性            | 描述                 | 类型      | 可选值           | 默认    |
| --------------- | -------------------- | --------- | ---------------- | ------- |
| **v-model**     | 滑块的绑定值         | `number`  | `-`              | `0`     |
| **step**        | 滑块可选择的粒度大小 | `number`  | `-`              | `1`     |
| **max**         | 滑块可选的最大值     | `number`  | `-`              | `100`   |
| **min**         | 滑块可选的最小值     | `number`  | `-`              | `0`     |
| **disabled**    | 禁用所有操作         | `boolean` | `'true','false'` | `false` |
| **showMarkers** | 显示每一个标记       | `boolean` | `'true','false'` | `false` |
| **hideValue**   | 是否隐藏滑块中的数字 | `boolean` | `'true','false'` | `false` |

### Slider Events

| 事件名     | 说明                   | 类型                   |
| ---------- | ---------------------- | ---------------------- |
| **change** | 当滑块的值改变时被调用 | `(value:number)=>void` |
