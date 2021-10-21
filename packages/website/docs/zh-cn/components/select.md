<playground
title="默认的"
name="ex-select-default"
/>

<playground
  title="多选的"
  desc="组件支持同时选中多个值"
  name="ex-select-multiple"
/>

<playground
  title="禁用的"
  desc="禁用所有的交互"
  name="ex-select-disabled"
/>

<playground
  title="禁用选项"
  desc="禁用指定的选项"
  name="ex-select-disableOption"
/>

<fe-attributes>

<fe-attributes-title title="Select Props" />

| 属性            | 描述                   | 类型                        | 可选值                      | 默认      |
| --------------- | ---------------------- | --------------------------- | --------------------------- | --------- |
| **modelValue**  | 选择器的值             | `'string','string[]'`       | `-`                         | `-`       |
| **placeholder** | 占位文本内容           | `string`                    | `-`                         | `-`       |
| **multiple**    | 是否支持多选           | `Boolean`                   | `-`                         | `false`   |
| **size**        | 选择器组件大小         | [NormalSizes](#normalsizes) | [NormalTypes](#normalsizes) | `medium`  |
| **width**       | 设置组件宽度           | `string`                    | `-`                         | `initial` |
| **clearable**   | 是否展示移除图标       | `Boolean`                   | `-`                         | `true`    |
| **disabled**    | 是否禁用交互           | `Boolean`                   | `-`                         | `false`   |
| **change**      | 选项被选中所触发的事件 | `(e)=>void`                 | `-`                         | `-`       |
| ...             | 原生属性               | `HTMLAttributes`            | `'class','id',...`          | `-`       |

</fe-attributes>

<fe-attributes>

<fe-attributes-title title="Option Props" />

| 属性         | 描述           | 类型      | 可选值 | 默认    |
| ------------ | -------------- | --------- | ------ | ------- |
| **value**    | 唯一鉴别值     | `string`  | `-`    | `-`     |
| **label**    | 展示的文本内容 | `string`  | `-`    | `-`     |
| **disabled** | 是否禁用交互   | `Boolean` | `-`    | `false` |

</fe-attributes>

<fe-attributes>

<fe-attributes-title title="NormalSizes" />

| 类型 可选值     |
| --------------- | ------------------------------------ |
| **NormalSizes** | `'mini', 'small', 'medium', 'large'` |

</fe-attributes>
