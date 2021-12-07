# Checkbox

Displays a boolean value.

### Default

use `v-model` set default state.

:::playground

checkbox/default.vue

:::

### Size

Differnt Size.

:::playground

checkbox/size.vue

:::

### Group

Manage a set of `Checkbox`.

:::playground

checkbox/group.vue

:::

### Checkbox Props

| Attribue     | Description                                 | Type                | Accepted values                      | Default  |
| ------------ | ------------------------------------------- | ------------------- | ------------------------------------ | -------- |
| **v-model**  | checked or not                              | `boolean`           | `'true','false'`                     | `false`  |
| **size**     | checkbox size                               | `string`            | `'mini', 'small', 'medium', 'large'` | `medium` |
| **disabled** | disable checkbox                            | `boolean`           | `'true','false'`                     | `false`  |
| **label**    | unique identification value (only in group) | `'string','number'` | `-`                                  | `-`      |

### CheckboxGroup Props

| Attribue     | Description          | Type      | Accepted values                      | Default  |
| ------------ | -------------------- | --------- | ------------------------------------ | -------- |
| **v-model**  | checked children     | `any[]`   | `-`                                  | `[]`     |
| **size**     | all checkbox size    | `string`  | `'mini', 'small', 'medium', 'large'` | `medium` |
| **disabled** | disable all checkbox | `boolean` | `'true','false'`                     | `false`  |
| **useRow**   | horizontal           | `boolean` | `-`                                  | `false`  |

### Checkbox Event

| Event      | Description    | Type            |
| ---------- | -------------- | --------------- |
| **change** | checkbox event | `CheckboxEvent` |

### CheckboxGroup Event

| Event      | Description          | Type            |
| ---------- | -------------------- | --------------- |
| **change** | checkbox group value | `CheckboxEvent` |
