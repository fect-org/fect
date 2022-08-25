---
title: Collapse 折叠框
name: Collapse
group: '表面'
index: 2
---

折叠显示大段的文本或组件内容，通常也被称为手风琴

### 默认的

默认只展示标题

:::playground

collapse/default.vue

:::

### 展开

指定初始时如何显示组件

:::playground

collapse/visible.vue

:::

### 阴影

给折叠框设置阴影凸显层级

:::playground

collapse/shadow.vue

:::

### 手风琴

一组具有手风琴效果的折叠框
:::playground

collapse/accordion.vue

:::

### Collapse Props

| 属性                | 描述                 | 类型          | 可选值           | 默认    |
| ------------------- | -------------------- | ------------- | ---------------- | ------- |
| **title(必须的)**   | 标题值               | `string`      | `-`              | `-`     |
| **subtitle**        | 子标题内容           | `string`      | `-`              | `-`     |
| **subTag**          | 自定义子标题容器元素 | `HTMLElement` | `-`              | `-`     |
| **v-model:visible** | 控制折叠框展开       | `boolean`     | `'true','false'` | `false` |
| **shadow**          | 设置阴影模式         | `boolean`     | `'true','false'` | `false` |

### CollapseGroup Props

| 属性          | 描述                          | 类型       | 可选值           | 默认     |
| ------------- | ----------------------------- | ---------- | ---------------- | -------- |
| **accordion** | 手风琴模式 (一次最多打开一个) | `boolean`  | `'true','false'` | `'true'` |
| **v-model**   | 当前激活的面板                | `number[]` | `-`              | `[]`     |
