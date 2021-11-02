<playground
  title="默认的"
  name="ex-grid-default"
/>

<playground 
  title="流体布局" 
  desc="容器的自动换行与缩放"
  name="ex-grid-fluid"
 />

<playground 
  title="响应式布局" 
  desc="在不同屏幕宽度下自动使用不同布局方式"
  name="ex-grid-responsive"
 />

<playground 
  title="隐藏元素" 
  desc="当单位大小为 0 时会自动隐藏当前元素"
  name="ex-grid-hidden"
 />

<playground 
  title="自动宽度" 
  desc="自动分配剩余宽度"
  name="ex-grid-auto"
 />

### Grid Props

| 属性             | 描述                                 | 类型           | 可选值                                  | 默认值       |
| ---------------- | ------------------------------------ | -------------- | --------------------------------------- | ------------ |
| **container**    | 设置 grid 组件为容器, 默认值:`false` | `boolean`      | `'true','false'`                        | `false`      |
| **gap**          | 子组件的间距                         | `number`       | -                                       | `0`          |
| **wrap**         | CSS 属性 "flex-wrap"，指定换行方式   | `Wrap`         | [WrapTypes](#wraptypes)                 | `wrap`       |
| **justify**      | CSS 属性 "justify-content"           | `Justify`      | [JustifyTypes](#justifytypes)           | `flex-start` |
| **alignItems**   | CSS 属性 "align-items"               | `AlignItems`   | [AlignItemsTypes](#alignitemstypes)     | `stretch`    |
| **alignContent** | CSS 属性 "align-content"             | `AlignContent` | [AlignContentTypes](#aligncontenttypes) | `flex-start` |
| **direction**    | CSS 属性 "flex-direction"            | `Direction`    | [DirectionTypes](#directiontypes)       | `row`        |
| **xs**           | 栅格宽度，影响 `xs` 断点与更宽的屏幕 | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **sm**           | 栅格宽度，影响 `sm` 断点与更宽的屏幕 | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **md**           | 栅格宽度，影响 `md` 断点与更宽的屏幕 | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **lg**           | 栅格宽度，影响 `lg` 断点与更宽的屏幕 | `number`       | `0 - 24`, `boolean`                     | `false`      |
| **xl**           | 栅格宽度，影响 `xl` 断点与更宽的屏幕 | `number`       | `0 - 24`, `boolean`                     | `false`      |

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
