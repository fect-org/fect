# Radio

Provides single user input from a selection of options.

### Default

:::playground

radio/default.vue

:::

### Group

一组可控选择的数值
:::playground

radio/group.vue

:::

### More

:::playground

radio/more.vue

:::

### Radio Props

| Attribue            | Description                   | Type            | Accepted values                      | Default  |
| ------------------- | ----------------------------- | --------------- | ------------------------------------ | -------- |
| **v-model:checked** | selected or not (in single)   | `boolean`       | `'true','false'`                     | `false`  |
| **disabed**         | disable current radio         | `boolean`       | `'true','false'`                     | `false`  |
| **value**           | unique ident value (in group) | `string,number` | `-`                                  | `-`      |
| **size**            | radio size                    | `string`        | `'mini', 'small', 'medium', 'large'` | `medium` |
| **change**          | 选项变化事件                  | `RadioEvent`    | `-`                                  | `-`      |

### RadioGroup Props

| Attribue     | Description                             | Type         | Accepted values                      | Default  |
| ------------ | --------------------------------------- | ------------ | ------------------------------------ | -------- |
| **v-model**  | radio group selected value              | `string`     | `-`                                  | `-`      |
| **useRow**   | align all sub-select boxes horizontally | `boolean`    | `'true','false'`                     | `false`  |
| **disabled** | disable all radio                       | `boolean`    | `'true','false'`                     | `false`  |
| **size**     | radios size                             | `string`     | `'mini', 'small', 'medium', 'large'` | `medium` |
| **change**   | radio 的值变化事件                      | `RadioEvent` | `-`                                  | `-`      |

### Radio Event

| Event      | Description | Type         |
| ---------- | ----------- | ------------ |
| **change** | radio event | `RadioEvent` |

### RadioGroup Event

| Event      | Description | Type         |
| ---------- | ----------- | ------------ |
| **change** | radio event | `RadioEvent` |
