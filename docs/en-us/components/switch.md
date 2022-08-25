---
title: Switch
name: Switch
group: Form
index: 7
---

Displays a boolean value.

### Default

:::playground

switch/default.vue

:::

### Disabled

:::playground

switch/disabled.vue

:::

### Size

Different size.

:::playground

switch/size.vue

:::

### Switch Props

| Attribue           | Description          | Type      | Accepted values                      | Default  |
| ------------------ | -------------------- | --------- | ------------------------------------ | -------- |
| **v-model**        | switch binding value | `any`     | `-`                                  | `-`      |
| **checked-value**  | checked value        | `any`     | `-`                                  | `true`   |
| **inactive-value** | unChecked value      | `any`     | `-`                                  | `false`  |
| **size**           | switch size          | `string`  | `'mini', 'small', 'medium', 'large'` | `medium` |
| **disabled**       | disable opeartion    | `boolean` | `'true','false'`                     | `false`  |

### Swipe Event

| Event      | Description  | Type          |
| ---------- | ------------ | ------------- |
| **change** | switch Event | `SwitchEvent` |
