---
title: Select
name: Select
group: Form
index: 6
---

### Default

:::playground

select/default.vue

:::

### Size

`Select` supports different size.

:::playground

select/size.vue

:::

### Multiple

`Select` supports multiple values to be selected.

:::playground

select/multiple.vue

:::

### Disabled

Disable all options.

:::playground

select/disabled.vue

:::

### Disabled Option

disable specified options.

:::playground

select/disableOption.vue

:::

### Select Props

| Attribue        | Description           | Type                  | Accepted values                      | Default   |
| --------------- | --------------------- | --------------------- | ------------------------------------ | --------- |
| **v-model**     | select value          | `'string','string[]'` | `-`                                  | `-`       |
| **placeholder** | slect placeholader    | `string`              | `-`                                  | `-`       |
| **multiple**    | multiple selection    | `Boolean`             | `-`                                  | `false`   |
| **size**        | select size           | `string`              | `'mini', 'small', 'medium', 'large'` | `medium`  |
| **width**       | select width          | `string`              | `-`                                  | `initial` |
| **clearable**   | clearable icon        | `Boolean`             | `-`                                  | `true`    |
| **disabled**    | disable current radio | `Boolean`             | `-`                                  | `false`   |

### Option Props

| Attribue     | Description            | Type      | Accepted values | Default |
| ------------ | ---------------------- | --------- | --------------- | ------- |
| **value**    | unique ident value     | `string`  | `-`             | `-`     |
| **label**    | display a group title  | `string`  | `-`             | `-`     |
| **disabled** | disable current option | `Boolean` | `-`             | `false` |

### Select Event

| Event      | Description    | Type        |
| ---------- | -------------- | ----------- |
| **change** | selected value | `(e)=>void` |
