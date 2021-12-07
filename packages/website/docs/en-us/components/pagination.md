# Pagination

Navigation and identification between multiple pages.

### Default

:::playground

pagination/default.vue

:::

### Naive

Naive pager.

:::playground

pagination/simple.vue

:::

### Limit

The maximum number of pages that can be displayed

:::playground

pagination/limit.vue

:::

### Custom

Customize buttons as icons.

:::playground

pagination/custom.vue

:::

### Size

Different size.

:::playground

pagination/size.vue

:::

### Pagination Props

| Attribue     | Description                            | Type                | Accepted values                      | Default  |
| ------------ | -------------------------------------- | ------------------- | ------------------------------------ | -------- |
| **v-model**  | current page                           | `number`            | `-`                                  | `1`      |
| **count**    | the total number of pages              | `'Number','String'` | `-`                                  | `1`      |
| **size**     | pagination size                        | `string`            | `'mini', 'small', 'medium', 'large'` | `medium` |
| **limit**    | limit of display page                  | `‘Number’,'String'` | `-`                                  | `7`      |
| **simple**   | naive pagination                       | `Boolean`           | `'true','false'`                     | `false`  |
| **prevText** | text of the previous page of the pager | `string`            | `-`                                  | `Prev`   |
| **nextText** | text of the next page of the pager     | `string`            | `-`                                  | `Next`   |

### Pagination Event

| Event      | Description      | Type                  |
| ---------- | ---------------- | --------------------- |
| **change** | pagination event | `(page:number)=>void` |

### Pagination Slots

| Slot name | Description     |
| --------- | --------------- |
| `-`       | `modal content` |
| `prev`    | `previous slot` |
| `next`    | `next slot`     |
