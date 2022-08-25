---
title: Code 代码段
name: Code
group: '通用'
index: 2
---

以标准化的方式展示源代码。

### 默认的

基础的行内代码

:::playground

code/default.vue

:::

### 代码块

多行的代码块展示

:::playground

code/block.vue

:::

### 经典模式

:::playground

code/classic.vue

:::

### Code Props

| 属性        | 描述                   | 类型      | 可选值           | 默认    |
| ----------- | ---------------------- | --------- | ---------------- | ------- |
| **block**   | 展示多行的代码块       | `boolean` | `'true','false'` | `false` |
| **name**    | 显示在代码块顶部的文字 | `string`  | `-`              | `-`     |
| **classic** | 以经典样式展示代码块   | `boolean` | `-`              | `false` |
