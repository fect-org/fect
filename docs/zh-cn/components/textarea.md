---
title: Textarea 文本输入框
name: Textarea
group: '表单'
index: 9
---

获取用户输入的多行文本

### 默认的

基础的输入字段

:::playground

textarea/default.vue

:::

### 禁用交互

禁用输入框的所有交互效果

:::playground

textarea/unwriteable.vue

:::

### 自动高度

根据文本内容自动改变输入框高度

:::playground

textarea/auto-height.vue

:::

### Textarea Props

| 属性            | 描述                                                                               | 类型                 | 推荐值                                                           | 默认     |
| --------------- | ---------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------- | -------- |
| **v-model**     | 可绑定的输入值                                                                     | `'string'`           | `-`                                                              | `''`     |
| **change**      | 输入框变化事件                                                                     | `(e)=>void`          | `-`                                                              | `-`      |
| **auto-height** | 自动计算输入框高度                                                                 | `'boolean'`          | `-`                                                              | `-`      |
| **width**       | 输入框宽度                                                                         | `'string'`           | `-`                                                              | `-`      |
| **resize**      | CSS reise                                                                          | `'string'`           | `'none', 'both', 'horizontal', 'vertical', 'initial', 'inherit'` | `'none'` |
| ...             | 原生属性[文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `TextareaAttributes` | `'class','id',...`                                               | `-`      |
