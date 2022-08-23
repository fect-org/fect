---
title: Textarea
name: Textarea
group: Form
index: 8
---

Retrieve multi-line user input.

### Default

Basic usage.

:::playground

textarea/default.vue

:::

### Disabled

Disable interactive textarea.

:::playground

textarea/unwriteable.vue

:::

### Auto Height

Change textarea height by content.

:::playground

textarea/auto-height.vue

:::

### Textarea Props

| Attribue        | Description                                                                                     | Type                 | Accepted values                                                  | Default  |
| --------------- | ----------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------- | -------- |
| **v-model**     | input value                                                                                     | `'string'`           | `-`                                                              | `''`     |
| **change**      |                                                                                                 | `(e)=>void`          | `-`                                                              | `-`      |
| **auto-height** | auto compute height                                                                             | `'boolean'`          | `-`                                                              | `-`      |
| **width**       | width                                                                                           | `'string'`           | `-`                                                              | `-`      |
| **resize**      | CSS reise                                                                                       | `'string'`           | `'none', 'both', 'horizontal', 'vertical', 'initial', 'inherit'` | `'none'` |
| ...             | native props more see[docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `TextareaAttributes` | `'class','id',...`                                               | `-`      |
