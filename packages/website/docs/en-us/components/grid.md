# Grid

Powerful fluid style layout container.

### Default

:::playground

grid/default.vue

:::

### Fluid Layout

Containers for wrapping and scaling.

:::playground

grid/fluid.vue

:::

### Responsive Layout

Use different layouts for different screen widths.

:::playground

grid/responsive.vue

:::

### Hide Elements

Hide elements when unit size is `0`.

:::playground

grid/hidden.vue

:::

### Auto Width

Auto fill remaining width.

:::playground

grid/auto.vue

:::

### Col

Base on `count` and `col` (It may cause lose fluid)

:::playground

grid/col.vue

:::

### Grid Props

| Attribue          | Description                                         | Type           | Accepted values                         | Default      |
| ----------------- | --------------------------------------------------- | -------------- | --------------------------------------- | ------------ |
| **justify**       | CSS "justify-content" property                      | `Justify`      | [JustifyTypes](#justifytypes)           | `flex-start` |
| **align-items**   | CSS "align-items" property                          | `AlignItems`   | [AlignItemsTypes](#alignitemstypes)     | `stretch`    |
| **align-content** | CSS "align-content" property                        | `AlignContent` | [AlignContentTypes](#aligncontenttypes) | `flex-start` |
| **direction**     | CSS "flex-direction" property                       | `Direction`    | [DirectionTypes](#directiontypes)       | `row`        |
| **xs**            | width of grid, for xs breakpoints and wider screens | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **sm**            | width of grid, for sm breakpoints and wider screens | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **md**            | width of grid, for md breakpoints and wider screens | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **lg**            | width of grid, for lg breakpoints and wider screens | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **xl**            | width of grid, for xl breakpoints and wider screens | `number`       | `0 - 24`, `boolean`                     | `false`      |

### GridGroup Props

| Attribue  | Description              | Type     | Accepted values         | Default |
| --------- | ------------------------ | -------- | ----------------------- | ------- |
| **gap**   | children distance        | `number` | -                       | `0`     |
| **wrap**  | CSS "flex-wrap" property | `Wrap`   | [WrapTypes](#wraptypes) | `wrap`  |
| **col**   | equally divided grids    | `number` | `0 - 24`                | `0`     |
| **count** | grids count              | `number` | `-`                     | `0`     |
| ...       | Grid props               | `-`      | `-`                     | `-`     |

### WrapTypes

| Type          | Accepted values                    |
| ------------- | ---------------------------------- |
| **WrapTypes** | `'nowrap', 'wrap', 'wrap-reverse'` |

### JustifyTypes

| Type             | Accepted values                                                                  |
| ---------------- | -------------------------------------------------------------------------------- |
| **JustifyTypes** | `'flex-start','center','flex-end','space-between','space-around','space-evenly'` |

### AlignTypes

| Type           | Accepted values                                          |
| -------------- | -------------------------------------------------------- |
| **AlignTypes** | `'flex-start','center','flex-end','stretch', 'baseline'` |

### AlignContentTypes

| Type           | Accepted values                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| **AlignTypes** | `'stretch','flex-start','center','flex-end', 'space-between','space-around'` |

### DirectionTypes

| Type           | Accepted values                                    |
| -------------- | -------------------------------------------------- |
| **AlignTypes** | `'row', 'row-reverse', 'column', 'column-reverse'` |

### Breakpoints

<fe-code block>
xs: { min: '0', max: '650px' },
<br/>
sm: { min: '650px', max: '900px' },
<br/>
md: { min: '900px', max: '1280px' },
<br/>
lg: { min: '1280px', max: '1920px' },
<br/>
xl: { min: '1920px', max: '10000px' },

</fe-code>
