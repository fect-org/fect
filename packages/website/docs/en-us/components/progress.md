# Progress

Display progress relative to a limit or related to a task.

### Default

:::playground

progress/default.vue

:::

### Type

Different type.

:::playground

progress/types.vue

:::

### Dynamic Colors

You can specify the color of the progress in any range.
:::playground

progress/colors.vue

:::

### Progress Props

| Attribue   | Description            | Type                        | Accepted values                            | Default   |
| ---------- | ---------------------- | --------------------------- | ------------------------------------------ | --------- |
| **value**  | current value          | `number`                    | `-`                                        | `0`       |
| **max**    | max value              | `'number','string'`         | `-`                                        | `100`     |
| **colors** | custom colors          | `{ [key: number]: string }` | `-`                                        | `{}`      |
| **type**   | predefined state types | `'string'`                  | `'default', 'success', 'warning', 'error'` | `default` |
