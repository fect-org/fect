---
title: Loading 加载中
name: Loading
group: '布告'
index: 2
---

表示动作正在后台运行

### 默认的

:::playground

loading/default.vue

:::

### 类型

:::playground

loading/type.vue

:::

### 尺寸

:::playground

loading/size.vue

:::

### 样式

可以选择不同样式的指示器

:::playground

loading/load.vue

:::

### Loading Props

| 属性          | 描述             | 类型     | 可选值                                     | 默认      |
| ------------- | ---------------- | -------- | ------------------------------------------ | --------- |
| **size**      | 指示器的大小     | `string` | `'mini', 'small', 'medium', 'large'`       | `medium`  |
| **type**      | 指示器类型       | `string` | `'default', 'success', 'warning', 'error'` | `default` |
| **color**     | 自定义指示器颜色 | `string` | `-`                                        | `-`       |
| **load-type** | 不同风格的指示器 | `string` | `'default','cube','wave'`                  | `default` |
