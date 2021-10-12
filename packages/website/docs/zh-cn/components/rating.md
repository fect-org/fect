# Rating / 评分

评分组件

<fe-code-show title="默认的" name="ex-rating-default"/>

<fe-code-show 
title="自定义图标"
name="ex-rating-custom"
desc="通过icon属性传入DOM设置自定义图标"
/>

<fe-code-show 
title="不同类型的"
name="ex-rating-type"
desc="通过type属性设置不同风格的组件"
/>

<fe-attributes>

<fe-attributes-title title="Rating Props" />

| 属性        | 描述                | 类型             | 可选值                                  | 默认      |
| ----------- | ------------------- | ---------------- | --------------------------------------- | --------- |
| **type**    | 不同类型的评分      | `string`         | `'default','success','warning','error'` | `default` |
| **icon**    | 指定评分的图标      | `Element`        | `-`                                     | `-`       |
| **count**   | 指定评分的最大值    | `number`         | `-`                                     | `5`       |
| **v-model** | 评分的值            | `number`         | `-`                                     | `0`       |
| **locked**  | 设置只读            | `boolean`        | `'true','false'`                        | `false`   |
| **change**  | Rating 的值变化事件 | `RatingEvent`    | `-`                                     | `-`       |
| ...         | 原生属性            | `HTMLAttributes` | `'class','id',...`                      | `-`       |

</fe-attributes>
