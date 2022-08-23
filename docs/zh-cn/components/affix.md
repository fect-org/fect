---
title: Afiix 固钉
name: Affix
group: '导航'
index: 1
---

固定元素

### 默认的

基础用法

:::playground

affix/default.vue

:::

### 位置

可以固定在底部

:::playground

affix/position.vue

:::

### Affix Props

| 属性         | 描述       | 类型            | 可选值       | 默认  |
| ------------ | ---------- | --------------- | ------------ | ----- |
| **offset**   | 偏移距离   | `string,number` | `-`          | `0`   |
| **z-index**  | `z-index`  | `number`        | `-`          | `100` |
| **position** | 固定的位置 | `string`        | `top,bottom` | `-`   |
