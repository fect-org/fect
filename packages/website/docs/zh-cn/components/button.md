# Button / 按钮

用于触发一个操作

### 默认的

默认 Button 包含一个动画效果

:::playground

button/default.vue

:::

### 加载中

表示正在运行或加载中的状态

:::playground

button/loading.vue

:::

### 禁用

禁止任何交互响应

:::playground

button/disabled.vue

:::

### 阴影

使用阴影突出显示更高层级的按钮

:::playground

button/shadow.vue

:::

### 类型

不同状态下的按钮

:::playground

button/type.vue

:::

### 尺寸

不同大小的按钮组件

:::playground

button/size.vue

:::

### 反色

底色与主色相反的透明按钮

:::playground

button/ghost.vue

:::

### 带图标的

按钮内的图标色彩和大小将会被自动设置

:::playground

button/icon.vue

:::

### Button Props

| 属性          | 描述             | 类型                | 可选值                                     | 默认      |
| ------------- | ---------------- | ------------------- | ------------------------------------------ | --------- |
| **type**      | 按钮属性         | `string`            | `'default', 'success', 'warning', 'error'` | `default` |
| **size**      | 按钮大小         | `string`            | `'mini','small','medium','large'`          | `medium`  |
| **ghost**     | 反转按钮颜色     | `boolean`           | `'true','false'`                           | `false`   |
| **effect**    | 是否显示动画效果 | `boolean`           | `'true','false'`                           | `true`    |
| **icon**      | 在按钮内显示图标 | `HTMLElement`       |                                            | `-`       |
| **auto**      | 自动缩放宽度     | `boolean`           | `'true','false'`                           | `false`   |
| **disabled**  | 是否禁用按钮     | `boolean`           | `'true','false'`                           | `false`   |
| **shadow**    | 是否显示阴影     | `boolean`           | `'true','false'`                           | `false`   |
| **loading**   | 是否启用加载中   | `boolean`           | `'true','false'`                           | `false`   |
| **load-type** | 设置加载中的风格 | `string`            | `'default','cube','wave'`                  | `default` |
| **click**     | 点击事件         | `MouseEventHandler` | `-`                                        | `-`       |
