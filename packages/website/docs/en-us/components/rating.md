## Rating

Display an indicator of rankings with stars.

### Default

:::playground

rating/default.vue

:::

### Icon

Customize the icons of a rating.

:::playground

rating/custom.vue

:::

### Type

Pass the property `type` to the Rating component.

:::playground

rating/type.vue

:::

### Rating Props

| Attribue    | Description         | Type          | Accepted values                         | Default   |
| ----------- | ------------------- | ------------- | --------------------------------------- | --------- |
| **type**    | rating type         | `string`      | `'default','success','warning','error'` | `default` |
| **icon**    | 指定评分的图标      | `Element`     | `-`                                     | `-`       |
| **count**   | rating star count   | `number`      | `-`                                     | `5`       |
| **v-model** | rating value        | `number`      | `-`                                     | `0`       |
| **locked**  | lock state          | `boolean`     | `'true','false'`                        | `false`   |
| **change**  | Rating 的值变化事件 | `RatingEvent` | `-`                                     | `-`       |

### Rating Event

| Event      | Description               | Type          |
| ---------- | ------------------------- | ------------- |
| **change** | rating value change event | `RatingEvent` |

### Pagination Slots

| Slot name | Description        |
| --------- | ------------------ |
| `icon`    | `set custom icon ` |
