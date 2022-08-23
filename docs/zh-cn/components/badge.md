---
title: Badge 徽标
name: Badge
group: '数据展示'
index: 2
---

显示一个徽标(它具有提示的意义)

### 默认的

展示一个数字或者一段文字

:::playground

badge/default.vue

:::

### 类型

以不同的色彩表达不同的状态

:::playground

badge/type.vue

:::

### 大小

不同大小的徽标组件

:::playground

badge/size.vue

:::

### 锚点

将徽章固定在指定位置

:::playground

badge/anchor.vue

:::

### Badge Props

| 属性     | 描述               | 类型                        | 可选值                      | 默认      |
| -------- | ------------------ | --------------------------- | --------------------------- | --------- |
| **size** | 组件大小           | `string`                    | [NormalSizes](#normalsizes) | `medium`  |
| **type** | 组件类型           | [NormalTypes](#normaltypes) | [NormalTypes](#normaltypes) | `default` |
| **dot**  | 忽略内容并显示圆点 | `'boolean'`                 | `-`                         | `-`       |

### BadgeAnchor Props

| 属性          | 描述           | 类型     | 可选值                                               | 默认         |
| ------------- | -------------- | -------- | ---------------------------------------------------- | ------------ |
| **placement** | 固定徽标的位置 | `string` | `'topLeft', 'topRight', 'bottomLeft', 'bottomRight'` | `'topRight'` |

### NormalSizes

| 类型 可选值     |                                      |
| --------------- | ------------------------------------ |
| **NormalSizes** | `'mini', 'small', 'medium', 'large'` |

### NormalTypes

| 类型            | 可选值                                     |
| --------------- | ------------------------------------------ |
| **NormalTypes** | `'default', 'success', 'warning', 'error'` |
