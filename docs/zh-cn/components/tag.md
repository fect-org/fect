---
title: Tag 标签
name: Tag
group: '数据展示'
index: 10
---

标记文档的状态与功能

### 默认的

:::playground

tag/default.vue

:::

### 类型

:::playground

tag/type.vue

:::

### 反色

:::playground

tag/invert.vue

:::

### 圆角

:::playground

tag/round.vue

:::

### 自定义颜色

:::playground

tag/color.vue

:::

### Tag Props

| 属性          | 描述           | 类型                                       | 推荐值 | 默认      |
| ------------- | -------------- | ------------------------------------------ | ------ | --------- |
| **text**      | 标签内容       | `String`                                   | -      | `-`       |
| **type**      | 标签类型       | `'default', 'success', 'warning', 'error'` | -      | `default` |
| **useInvert** | 反转背景与主色 | `boolean`                                  | -      | `false`   |
| **color**     | 自定义颜色     | `string`                                   | -      | `-`       |
| **round**     | 圆角           | `boolean`                                  | -      | `false`   |
