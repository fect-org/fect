## Badge

Display an indicator that requires attention.

### Default

Show number or text.

:::playground

badge/default.vue

:::

### Type

Express state in different colors.

:::playground

badge/type.vue

:::

### Size

Display different size

:::playground

badge/size.vue

:::

### Anchor

Fix the `Badge` in the designated position.

:::playground

badge/anchor.vue

:::

### Badge Props

| Attribue | Description                 | Type                        | Accepted values             | Default   |
| -------- | --------------------------- | --------------------------- | --------------------------- | --------- |
| **size** | badge size                  | `string`                    | [NormalSizes](#normalsizes) | `medium`  |
| **type** | badge type                  | [NormalTypes](#normaltypes) | [NormalTypes](#normaltypes) | `default` |
| **dot**  | show dot and ignore content | `'boolean'`                 | `-`                         | `-`       |

### BadgeAnchor Props

| Attribue      | Description            | Type     | Accepted values                                      | Default      |
| ------------- | ---------------------- | -------- | ---------------------------------------------------- | ------------ |
| **placement** | fixe position of Badge | `string` | `'topLeft', 'topRight', 'bottomLeft', 'bottomRight'` | `'topRight'` |

### NormalSizes

| Type            | Accepted values                      |
| --------------- | ------------------------------------ |
| **NormalSizes** | `'mini', 'small', 'medium', 'large'` |

### NormalTypes

| Type            | Accepted values                            |
| --------------- | ------------------------------------------ |
| **NormalTypes** | `'default', 'success', 'warning', 'error'` |
