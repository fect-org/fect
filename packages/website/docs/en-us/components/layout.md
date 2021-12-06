# layout

Build page layouts in an easy way

### Default

`row` component can create an row container.

:::playground

layout/default.vue

:::

### Col

`col` component can careate different width container.

:::playground

layout/column.vue

:::

### Distance

Specify the spacing of child elements (columns) on the `row` component.

:::playground

layout/spacer.vue

:::

### Compose

Use 1/24 columns to complete the layout.

:::playground

layout/compose.vue

:::

### Justify

Use the `justify` and `align` attributes to align columns in different ways.

:::playground

layout/align.vue

:::

### Row Props

| Attribue    | Description          | Type                | Accepted values                                          | Default |
| ----------- | -------------------- | ------------------- | -------------------------------------------------------- | ------- |
| **tag**     | container element    | `HTMLElemenet`      | `-`                                                      | `div`   |
| **gutter**  | children distance    | `'string','number'` | `-`                                                      | `0`     |
| **justify** | horizontal alignment | `string`            | `'start','end','center','space-around','space-between',` | `start` |
| **align**   | vertical alignment   | `string`            | `'top', 'middle', 'bottom'`                              | `top`   |

### Col Props

| Attribue   | Description       | Type                | Accepted values | Default |
| ---------- | ----------------- | ------------------- | --------------- | ------- |
| **tag**    | container element | `HTMLElement`       | `-`             | `div`   |
| **span**   | col width         | `'string','number'` | `'0-24'`        | `24`    |
| **offset** | offset width      | `'string','number'` | `-`             | `0`     |
