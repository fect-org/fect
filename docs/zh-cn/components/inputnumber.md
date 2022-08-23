---
title: InputNumber 计数器
name: InputNumber
group: '表单'
index: 4
---

### 默认的

:::playground

input-number/default.vue

:::

### 步数

:::playground

input-number/step.vue

:::

### 严格模式

:::playground

input-number/strictly.vue

:::

### Input Props

| 属性            | 描述                                                                             | 类型              | 可选值                            | 默认         |
| --------------- | -------------------------------------------------------------------------------- | ----------------- | --------------------------------- | ------------ |
| **v-model**     | 绑定值                                                                           | `number`          | `-`                               | `-`          |
| **placeholder** | 输入框默认 placeholder                                                           | `string`          | `-`                               | `-`          |
| **size**        | 组件大小                                                                         | `string`          | `'mini','small','medium','large'` | `medium`     |
| **disabled**    | 是否禁用交互                                                                     | `boolean`         | `'true','false'`                  | `false`      |
| **step**        | 计数器步长                                                                       | `number`          | `-`                               | `1`          |
| **max**         | 计数器的最大值                                                                   | `number`          | `-`                               | `'Infinity'` |
| **min**         | 计数器的最最小值                                                                 | `number`          | `-`                               | `'Infinity'` |
| **precision**   | 精读                                                                             | `number`          | `-`                               | `-`          |
| **strictly**    | 严格模式                                                                         | `boolean`         | `'true','false'`                  | `false`      |
| ...             | 原生属性 [docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `InputAttributes` | `'class','id',...`                | `-`          |

### Input Event

| 事件       | 描述 | 类型                      |
| ---------- | ---- | ------------------------- |
| **change** |      | `(newVal,oldValue)=>void` |
