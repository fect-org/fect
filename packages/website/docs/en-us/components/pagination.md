## Pagination

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

| Attribue        | Description                            | Type         | Accepted values                      | Default   |
| --------------- | -------------------------------------- | ------------ | ------------------------------------ | --------- |
| **v-model**     | current page                           | `number`     | `-`                                  | `1`       |
| **count**       | the total number of pages              | `number`     | `-`                                  | `1`       |
| **size**        | pagination size                        | `string`     | `'mini', 'small', 'medium', 'large'` | `medium`  |
| **limit**       | limit of display page                  | `number`     | `-`                                  | `7`       |
| **simple**      | naive pagination                       | `boolean`    | `'true','false'`                     | `false`   |
| **prev-text**   | text of the previous page of the pager | `string`     | `-`                                  | `Prev`    |
| **next-text**   | text of the next page of the pager     | `string`     | `-`                                  | `Next`    |
| **hover-color** | pagination item hover highlight        | `hex string` | `-`                                  | `#0070f3` |

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
