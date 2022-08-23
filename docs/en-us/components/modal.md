---
title: Modal
name: Modal
group: FEEDBACK
index: 2
---

Display popup content that requires attention or provides additional information.

### Default

Use v-model:visible to control display and hide.

:::playground

modal/default.vue

:::

### Customizable

Use slot custom your modal.

:::playground

modal/custom.vue

:::

### Functional

`Modal` is a function，the corresponding modal box will pop up directly on the page after calling.

:::playground

modal/function.vue

:::

### Modal Props

| Attribue                  | Description                      | Type          | Accepted values  | Default  |
| ------------------------- | -------------------------------- | ------------- | ---------------- | -------- |
| **v-model:visible**       | visible or hidden                | `boolean`     | `'true','false'` | `false`  |
| **title**                 | modal title                      | `string`      | `-`              | `-`      |
| **width**                 | modal width                      | `string`      | `-`              | `400px`  |
| **cancel**                | cancel button text               | `string`      | `-`              | `cancel` |
| **done**                  | confrim button text              | `string`      | `-`              | `done`   |
| **teleport**              | modal mounted node               | `HTMLElement` | `-`              | `body`   |
| **disable-overlay-click** | click background and don't close | `boolean`     | `'true','false'` | `false`  |

### Modal Options

Only work with function call.

| Attribue    | Description         | Type       | Accepted values | Default  |
| ----------- | ------------------- | ---------- | --------------- | -------- |
| **title**   | modal title         | `string`   | `-`             | `-`      |
| **width**   | modal width         | `string`   | `-`             | `400px`  |
| **cancel**  | cancel button text  | `string`   | `-`             | `cancel` |
| **done**    | confrim button text | `string`   | `-`             | `done`   |
| **content** | modal text content  | `string`   | `-`             | `-`      |
| **close**   | modal cancel event  | `()=>void` | `-`             | `-`      |
| **confirm** | modal confirm event | `()=>void` | `-`             | `-`      |

### Modal Events

| Event       | Description         | Type       |
| ----------- | ------------------- | ---------- |
| **cancel**  | modal cancel event  | `()=>void` |
| **confirm** | modal confirm event | `()=>void` |

### Modal Slots

| Slot name | Description           |
| --------- | --------------------- |
| `-`       | `modal content`       |
| `title`   | `custom title`        |
| `action`  | `custom modal footer` |
