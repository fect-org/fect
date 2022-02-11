## Grid / 栅格

### 默认的

:::playground

grid/default.vue

:::

### 流体布局

容器的自动换行与缩放

:::playground

grid/fluid.vue

:::

### 响应式布局

在不同屏幕宽度下自动使用不同布局方式

:::playground

grid/responsive.vue

:::

### 隐藏元素

当单位大小为 `0` 时会自动隐藏当前元素

:::playground

grid/hidden.vue

:::

### 自动宽度

自动分配剩余宽度

:::playground

grid/auto.vue

:::

### 列

根据`count`和`col`进行布局(会导致`grid`属性失效)

:::playground

grid/col.vue

:::

### Grid Props

| 属性             | 描述                                 | 类型           | 可选值                                  | 默认值       |
| ---------------- | ------------------------------------ | -------------- | --------------------------------------- | ------------ |
| **justify**      | CSS 属性 "justify-content"           | `Justify`      | [JustifyTypes](#justifytypes)           | `flex-start` |
| **alignItems**   | CSS 属性 "align-items"               | `AlignItems`   | [AlignItemsTypes](#alignitemstypes)     | `stretch`    |
| **alignContent** | CSS 属性 "align-content"             | `AlignContent` | [AlignContentTypes](#aligncontenttypes) | `flex-start` |
| **direction**    | CSS 属性 "flex-direction"            | `Direction`    | [DirectionTypes](#directiontypes)       | `row`        |
| **xs**           | 栅格宽度，影响 `xs` 断点与更宽的屏幕 | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **sm**           | 栅格宽度，影响 `sm` 断点与更宽的屏幕 | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **md**           | 栅格宽度，影响 `md` 断点与更宽的屏幕 | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **lg**           | 栅格宽度，影响 `lg` 断点与更宽的屏幕 | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **xl**           | 栅格宽度，影响 `xl` 断点与更宽的屏幕 | `number`       | `0 - 24`, `boolean`                     | `false`      |

### GridGroup Props

| 属性      | 描述                               | 类型     | 可选值                  | 默认值 |
| --------- | ---------------------------------- | -------- | ----------------------- | ------ |
| **gap**   | 子组件的间距                       | `number` | -                       | `0`    |
| **wrap**  | CSS 属性 "flex-wrap"，指定换行方式 | `Wrap`   | [WrapTypes](#wraptypes) | `wrap` |
| **col**   | 等分的栅格数                       | `number` | `0 - 24`                | `0`    |
| **count** | 栅格的元素个数                     | `number` | `-`                     | `0`    |
| ...       | 继承 Grid 的所有属性               | `-`      | `-`                     | `-`    |

### WrapTypes

| 类型          | 可选值                             |     |
| ------------- | ---------------------------------- | --- |
| **WrapTypes** | `'nowrap', 'wrap', 'wrap-reverse'` |     |

### JustifyTypes

| 类型             | 可选值                                                                           |     |
| ---------------- | -------------------------------------------------------------------------------- | --- |
| **JustifyTypes** | `'flex-start','center','flex-end','space-between','space-around','space-evenly'` |     |

### AlignTypes

| 类型           | 可选值                                                   |     |
| -------------- | -------------------------------------------------------- | --- |
| **AlignTypes** | `'flex-start','center','flex-end','stretch', 'baseline'` |     |

### AlignContentTypes

| 类型           | 可选值                                                                       |     |
| -------------- | ---------------------------------------------------------------------------- | --- |
| **AlignTypes** | `'stretch','flex-start','center','flex-end', 'space-between','space-around'` |     |

### DirectionTypes

| 类型           | 可选值                                             |     |
| -------------- | -------------------------------------------------- | --- |
| **AlignTypes** | `'row', 'row-reverse', 'column', 'column-reverse'` |     |

### 断点值

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
