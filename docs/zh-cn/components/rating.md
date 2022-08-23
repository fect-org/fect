---
title: Rating 评分
name: Rating
group: '表单'
index: 6
---

评分组件

### 默认的

:::playground

rating/default.vue

:::

### 自定义图标

通过 icon 属性传入 DOM 设置自定义图标

:::playground

rating/custom.vue

:::

### 不同类型的

通过 `type` 属性设置不同风格的组件

:::playground

rating/type.vue

:::

### Rating Props

| 属性        | 描述                | 类型          | 可选值                                  | 默认      |
| ----------- | ------------------- | ------------- | --------------------------------------- | --------- |
| **type**    | 不同类型的评分      | `string`      | `'default','success','warning','error'` | `default` |
| **icon**    | 指定评分的图标      | `Element`     | `-`                                     | `-`       |
| **count**   | 指定评分的最大值    | `number`      | `-`                                     | `5`       |
| **v-model** | 评分的值            | `number`      | `-`                                     | `0`       |
| **locked**  | 设置只读            | `boolean`     | `'true','false'`                        | `false`   |
| **change**  | Rating 的值变化事件 | `RatingEvent` | `-`                                     | `-`       |
