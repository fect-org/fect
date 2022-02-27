## Tooltip

Displays additional information on hover.

### Default

Basic usage.

:::playground

tooltip/default.vue

:::

### Trigger

Different trigger way.

:::playground

tooltip/trigger.vue

:::

### Variable

:::playground

tooltip/variable.vue

:::

### Placement

:::playground

tooltip/placement.vue

:::

### Tooltip Props

| Attribue            | Description                                    | Type      | Accepted values                                                                                                                      | Default      |
| ------------------- | ---------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| **v-model:visible** | visible or not                                 | `boolean` | `true,false`                                                                                                                         | `false`      |
| **type**            | preset style type                              | `string`  | `'default', 'success', 'warning', 'error'`                                                                                           | `default`    |
| **content**         | prompt text                                    | `string`  | `-`                                                                                                                                  | `true,false` |
| **placement**       | position of the tooltip relative to the target | `string`  | `'top', 'topStart', 'topEnd', 'left', 'leftStart', 'leftEnd','bottom', 'bottomStart','bottomEnd', 'right', 'rightStart', 'rightEnd'` | `top`        |
| **visible-arrow**   | display arrow icon                             | `boolean` | `true,false`                                                                                                                         | `true`       |
| **show-after**      | delay before tooltip is shown                  | `number`  | `-`                                                                                                                                  | `0`          |
| **hide-after**      | delay before tooltip is hidden                 | `number`  | `-`                                                                                                                                  | `0`          |
| **offset**          | distance between pop-up and target(px)         | `number`  | `-`                                                                                                                                  | `12`         |
| **portal-class**    | className of pop-up box                        | `string`  | `-`                                                                                                                                  | `-`          |

### Tooltip Slots

| Slot name | Description      |
| --------- | ---------------- |
| `content` | `custom content` |
