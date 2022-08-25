---
title: Button
name: Button
group: Common
index: 1
---

Trigger an operation

### Default

The basic `Button` contains an animation effect.

:::playground

button/default.vue

:::

### Loading

Show running status.

:::playground

button/loading.vue

:::

### Disabled

Not allowed any action

:::playground

button/disabled.vue

:::

### Shadow

The shadow highlights the level of the button.

:::playground

button/shadow.vue

:::

### Type

Different state.

:::playground

button/type.vue

:::

### Size

Differnet size

:::playground

button/size.vue

:::

### Ghost

The opposite color.

:::playground

button/ghost.vue

:::

### With Icon

The `color` and `size` of the icon will be set automatically.

:::playground

button/icon.vue

:::

### Group

:::playground

button/group.vue

:::

### Button Props

| Attribue      | Description               | Type      | Accepted values                            | Default   |
| ------------- | ------------------------- | --------- | ------------------------------------------ | --------- |
| **type**      | button type               | `string`  | `'default', 'success', 'warning', 'error'` | `default` |
| **size**      | button size               | `string`  | `'mini','small','medium','large'`          | `medium`  |
| **ghost**     | the opposite color        | `boolean` | `'true','false'`                           | `false`   |
| **effect**    | display animation         | `boolean` | `'true','false'`                           | `true`    |
| **auto**      | autoscale width           | `boolean` | `'true','false'`                           | `false`   |
| **disabled**  | disable button            | `boolean` | `'true','false'`                           | `false`   |
| **shadow**    | display shadow            | `boolean` | `'true','false'`                           | `false`   |
| **loading**   | display loading indicator | `boolean` | `'true','false'`                           | `false`   |
| **load-type** | loading type              | `string`  | `'default','cube','wave'`                  | `default` |
| **html-type** | native button type        | `string`  | `submit`, `reset`,`button`                 | `button`  |

### ButtonGroup Props

| Attribue     | Description                 | Type      | Accepted values                   | Default |
| ------------ | --------------------------- | --------- | --------------------------------- | ------- |
| **size**     | control all button size     | `string`  | `'mini','small','medium','large'` | `small` |
| **auto**     | control all autoscale width | `boolean` | `'true','false'`                  | `true`  |
| **vertical** | show all buttons vertically | `boolean` | `'true','false'`                  | `false` |

### Button Events

| Event     | Description | Type                |
| --------- | ----------- | ------------------- |
| **click** | click event | `MouseEventHandler` |

### Button Slots

| Slot name | Description      |
| --------- | ---------------- |
| `-`       | default          |
| `icon`    | set icon element |
