---
title: Form
name: Form
group: Form
index: 1
---

Include `Input`, `Radio`,` Select`, `Checkbox` and more Form component

:::playground

form/default.vue

:::

### Form Props

| Attribue           | Description                                                                                   | Type              | Accepted values                 | Default  |
| ------------------ | --------------------------------------------------------------------------------------------- | ----------------- | ------------------------------- | -------- |
| **model**          | data of form component                                                                        | `object`          | `-`                             | `{}`     |
| **rules**          | validation rules of form see more advanced usage [proy](https://github.com/fect-org/validate) | `object`          | `-`                             | `{}`     |
| **inline**         | display inline mode                                                                           | `boolean`         | `true`,`false`                  | `false`  |
| **label-position** | position of label.(Css properties: flex-direction)                                            | `string`          | `left`,`right`,`top`            | `right`  |
| **label-width**    | width of label                                                                                | `number`,`string` | `-`                             | `auto`   |
| **show-message**   | show the error message                                                                        | `boolean`         | `true`,`false`                  | `true`   |
| **size**           | control all form-item size                                                                    | `string`          | `mini`,`small`,`medium`,`large` | `medium` |
| **disabled**       | disabled all form-item                                                                        | `boolean`         | `true`,`false`                  | `true`   |

### FormItem Props

| Attribue           | Description                                                                                   | Type              | Accepted values                 | Default  |
| ------------------ | --------------------------------------------------------------------------------------------- | ----------------- | ------------------------------- | -------- |
| **prop**           | a key of model. In the use of validate and resetFields method, the attribute is required      | `string`          | `-`                             | `-`      |
| **rules**          | validation rules of form see more advanced usage [proy](https://github.com/fect-org/validate) | `object`          | `-`                             | `{}`     |
| **label**          | label name                                                                                    | `string`          | `-`                             | `-`      |
| **inline**         | display inline mode                                                                           | `boolean`         | `true`,`false`                  | `false`  |
| **label-position** | position of label.(Css properties: flex-direction)                                            | `string`          | `left`,`right`,`top`            | `right`  |
| **label-width**    | width of label                                                                                | `number`,`string` | `-`                             | `auto`   |
| **required**       | required                                                                                      | `boolean`         | `true`,`false`                  | `false`  |
| **show-message**   | show the error message                                                                        | `boolean`         | `true`,`false`                  | `false`  |
| **size**           | control form-item size                                                                        | `string`          | `mini`,`small`,`medium`,`large` | `medium` |
| **disabled**       | disabled form-item                                                                            | `boolean`         | `true`,`false`                  | `true`   |

### Form Instance

`FormInstance` is the type of component instance:

```js
import { ref } from 'vue'
import type { FormInstance } from '@fect-ui/vue'

const formRef = ref<FormInstance>();

formRef.value?.validate()

```
