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

<attributes>

<attributes-title title="Grid Props" />

| 属性             | 描述                                 | 类型             | 可选值                                  | 默认值       |
| ---------------- | ------------------------------------ | ---------------- | --------------------------------------- | ------------ |
| **container**    | 设置 grid 组件为容器, 默认值:`false` | `boolean`        | `'true','false'`                        | `false`      |
| **gap**          | 子组件的间距                         | `number`         | -                                       | `0`          |
| **wrap**         | CSS 属性 "flex-wrap"，指定换行方式   | `Wrap`           | [WrapTypes](#wrapTypes)                 | `wrap`       |
| **justify**      | CSS 属性 "justify-content"           | `Justify`        | [JustifyTypes](#justifyTypes)           | `flex-start` |
| **alignItems**   | CSS 属性 "align-items"               | `AlignItems`     | [AlignItemsTypes](#alignitemsTypes)     | `stretch`    |
| **alignContent** | CSS 属性 "align-content"             | `AlignContent`   | [AlignContentTypes](#aligncontentTypes) | `flex-start` |
| **direction**    | CSS 属性 "flex-direction"            | `Direction`      | [DirectionTypes](#directionTypes)       | `row`        |
| **xs**           | 栅格宽度，影响 `xs` 断点与更宽的屏幕 | `number`         | `0 - 24`, `boolean`                     | `false`      |
| **sm**           | 栅格宽度，影响 `sm` 断点与更宽的屏幕 | `number`         | `0 - 24`, `boolean`                     | `false`      |
| **md**           | 栅格宽度，影响 `md` 断点与更宽的屏幕 | `number`         | `0 - 24`, `boolean`                     | `false`      |
| **lg**           | 栅格宽度，影响 `lg` 断点与更宽的屏幕 | `number`         | `0 - 24`, `boolean`                     | `false`      |
| **xl**           | 栅格宽度，影响 `xl` 断点与更宽的屏幕 | `number`         | `0 - 24`, `boolean`                     | `false`      |
| ...              | 原生属性                             | `HTMLAttributes` | `'id', 'class', ...`                    | -            |

</attributes>

<attributes>
  
<attributes-title title="WrapTypes" />

| 类型          | 可选值                             |     |
| ------------- | ---------------------------------- | --- |
| **WrapTypes** | `'nowrap', 'wrap', 'wrap-reverse'` |     |

</attributes>

<attributes>

<attributes-title title="JustifyTypes" />

| 类型             | 可选值                                                                           |     |
| ---------------- | -------------------------------------------------------------------------------- | --- |
| **JustifyTypes** | `'flex-start','center','flex-end','space-between','space-around','space-evenly'` |     |

</attributes>

<attributes>

<attributes-title title="AlignTypes" />

| 类型           | 可选值                                                   |     |
| -------------- | -------------------------------------------------------- | --- |
| **AlignTypes** | `'flex-start','center','flex-end','stretch', 'baseline'` |     |

</attributes>

<attributes>

<attributes-title title="AlignContentTypes" />

| 类型           | 可选值                                                                       |     |
| -------------- | ---------------------------------------------------------------------------- | --- |
| **AlignTypes** | `'stretch','flex-start','center','flex-end', 'space-between','space-around'` |     |

</attributes>

<attributes>

<attributes-title title="DirectionTypes" />

| 类型           | 可选值                                             |     |
| -------------- | -------------------------------------------------- | --- |
| **AlignTypes** | `'row', 'row-reverse', 'column', 'column-reverse'` |     |

</attributes>

<attributes>

<attributes-title title="断点值" />

<fe-card>
  
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

</fe-card>

</attributes>
