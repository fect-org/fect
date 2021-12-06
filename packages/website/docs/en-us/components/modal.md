# Modal

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

### Modal Props

| Attribue            | Description         | Type          | Accepted values  | Default  |
| ------------------- | ------------------- | ------------- | ---------------- | -------- |
| **v-model:visible** | visible or hidden   | `boolean`     | `'true','false'` | `false`  |
| **title**           | modal title         | `string`      | `-`              | `-`      |
| **width**           | modal width         | `string`      | `-`              | `420px`  |
| **cancel**          | cancel button text  | `string`      | `-`              | `cancel` |
| **done**            | confrim button text | `string`      | `-`              | `done`   |
| **teleport**        | modal mounted node  | `HTMLElement` | `-`              | `body`   |

### Modal Slots

| Slot name | Description           |
| --------- | --------------------- |
| `-`       | `modal content`       |
| `title`   | `custom title`        |
| `action`  | `custom modal footer` |
