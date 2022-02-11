## Skeleton

Set up a skeleton screen where you need to wait for the content to load.

### Default

Basic skeleton.

:::playground

skeleton/default.vue

:::

### Effector

Close Effect

:::playground

skeleton/animate.vue

:::

### Loading

When the `Loading` is over, we often need to display the real UI. You can control whether to display the real DOM through the value of loading.
Then use the slot to set the UI that needs to be displayed after loading is over.

:::playground

skeleton/loading.vue

:::

### More

Most of the time, the skeleton screen is used to render the list, when we need to render a fake UI when getting data from the server.

:::playground

skeleton/more.vue

:::

### Skeleton Props

| Attribue      | Description                                                                                      | Type                                        | Accepted values  | Default   |
| ------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------- | ---------------- | --------- |
| **loading**   | display the real `DOM`                                                                           | `boolean`                                   | `'true','false'` | `false`   |
| **rows**      | number of skeleton screen paragraphs                                                             | `number`                                    | -                | `0`       |
| **animated**  | set animation                                                                                    | `boolean`                                   | `'true','false'` | `false`   |
| **rowsWidth** | width of the paragraph occupying the bitmap, you can pass an array to set the width of each line | `number` , `string` , `string[]`,`number[]` | `100%`           | `initial` |

### SkeletonItem Props

| Attribue     | Description     | Type                            | Accepted values                 | Default |
| ------------ | --------------- | ------------------------------- | ------------------------------- | ------- |
| **variable** | placement style | [VariableTypes](#variabletypes) | [VariableTypes](#variabletypes) | `text`  |

### VariableTypes

| Type              | Accepted values                                                      |
| ----------------- | -------------------------------------------------------------------- |
| **VariableTypes** | `'p', 'text', 'h1', 'h3','rect','circle','image','button','caption'` |
