---
title: InputNumber
name: InputNumber
group: Form
index: 4
---

### Default

Basic input field.

:::playground

input-number/default.vue

:::

### Step

:::playground

input-number/step.vue

:::

### Strictly

:::playground

input-number/strictly.vue

:::

### Input Props

| Attribue        | Description                                                                                   | Type              | Accepted values                   | Default      |
| --------------- | --------------------------------------------------------------------------------------------- | ----------------- | --------------------------------- | ------------ |
| **v-model**     | input value                                                                                   | `number`          | `-`                               | `-`          |
| **placeholder** | input placeholder                                                                             | `string`          | `-`                               | `-`          |
| **size**        | input size                                                                                    | `string`          | `'mini','small','medium','large'` | `medium`     |
| **disabled**    | disabled input events                                                                         | `boolean`         | `'true','false'`                  | `false`      |
| **step**        | incremental step                                                                              | `number`          | `-`                               | `1`          |
| **max**         | the maximum allowed value                                                                     | `number`          | `-`                               | `'Infinity'` |
| **min**         | the minimum allowed value                                                                     | `number`          | `-`                               | `'Infinity'` |
| **precision**   | precision of input value                                                                      | `number`          | `-`                               | `false`      |
| **strictly**    | whether input value can only be multiple of step                                              | `boolean`         | `'true','false'`                  | `false`      |
| ...             | native props more see [docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `InputAttributes` | `'class','id',...`                | `-`          |

### Input Event

| Event      | Description        | Type                      |
| ---------- | ------------------ | ------------------------- |
| **change** | input change event | `(newVal,oldValue)=>void` |
