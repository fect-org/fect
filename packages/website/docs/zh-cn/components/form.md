# Form / 表单

包含 `输入框`, `单选框`,` 下拉选择`, `多选框` 等用户输入的组件用于收集验证提交数据

:::playground

form/default.vue

:::

### Form Props

| 属性               | 描述                                                           | 类型              | 可选值               | 默认值  |
| ------------------ | -------------------------------------------------------------- | ----------------- | -------------------- | ------- |
| **model**          | 表单数据对象                                                   | `object`          | `-`                  | `{}`    |
| **rules**          | 表单验证规则 参照 [proy](https://github.com/fect-org/validate) | `object`          | `-`                  | `{}`    |
| **inline**         | 行内表单模式                                                   | `boolean`         | `true`,`false`       | `false` |
| **label-position** | CSS 属性 "flex-direction"                                      | `string`          | `left`,`right`,`top` | `right` |
| **label-width**    | 表单域标签的宽度                                               | `number`,`string` | `-`                  | `auto`  |
| **show-message**   | 是否显示校验错误信息                                           | `boolean`         | `true`,`false`       | `true`  |

### FormItem Props

| 属性               | 描述                                                      | 类型              | 可选值               | 默认值  |
| ------------------ | --------------------------------------------------------- | ----------------- | -------------------- | ------- |
| **prop**           | 表单域`model` 字段， 在使用表单验证的情况下该属性是必填的 | `string`          | `-`                  | `-`     |
| **label**          | 标签名                                                    | `string`          | `-`                  | `-`     |
| **inline**         | 行内表单模式                                              | `boolean`         | `true`,`false`       | `false` |
| **label-position** | CSS 属性 "flex-direction"                                 | `string`          | `left`,`right`,`top` | `right` |
| **label-width**    | 表单域标签的宽度                                          | `number`,`string` | `-`                  | `auto`  |
| **required**       | 是否必填，如不设置，则会根据校验规则自动生成              | `boolean`         | `true`,`false`       | `false` |
| **show-message**   | 是否显示校验错误信息                                      | `boolean`         | `true`,`false`       | `false` |
