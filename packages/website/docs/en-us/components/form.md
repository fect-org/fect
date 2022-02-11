## Form

Include `Input`, `Radio`,` Select`, `Checkbox` and more Form component

:::playground

form/default.vue

:::

### Form Props

| Attribue           | Description                                                                                   | Type              | Accepted values      | Default |
| ------------------ | --------------------------------------------------------------------------------------------- | ----------------- | -------------------- | ------- |
| **model**          | data of form component                                                                        | `object`          | `-`                  | `{}`    |
| **rules**          | validation rules of form see more advanced usage [proy](https://github.com/fect-org/validate) | `object`          | `-`                  | `{}`    |
| **inline**         | display inline mode                                                                           | `boolean`         | `true`,`false`       | `false` |
| **label-position** | position of label.(Css properties: flex-direction)                                            | `string`          | `left`,`right`,`top` | `right` |
| **label-width**    | width of label                                                                                | `number`,`string` | `-`                  | `auto`  |
| **show-message**   | show the error message                                                                        | `boolean`         | `true`,`false`       | `true`  |

### FormItem Props

| Attribue           | Description                                                                              | Type              | Accepted values      | Default |
| ------------------ | ---------------------------------------------------------------------------------------- | ----------------- | -------------------- | ------- |
| **prop**           | a key of model. In the use of validate and resetFields method, the attribute is required | `string`          | `-`                  | `-`     |
| **label**          | label name                                                                               | `string`          | `-`                  | `-`     |
| **inline**         | display inline mode                                                                      | `boolean`         | `true`,`false`       | `false` |
| **label-position** | position of label.(Css properties: flex-direction)                                       | `string`          | `left`,`right`,`top` | `right` |
| **label-width**    | width of label                                                                           | `number`,`string` | `-`                  | `auto`  |
| **required**       | required                                                                                 | `boolean`         | `true`,`false`       | `false` |
| **show-message**   | show the error message                                                                   | `boolean`         | `true`,`false`       | `false` |
