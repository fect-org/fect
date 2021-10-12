# Badge / 徽标

显示一个徽标(它具有提示的意义)

<fe-code-show
  title="默认的"
  name="ex-badge-default"
  desc="展示一个数字或者一段文字"
/>

<fe-code-show
  title="类型"
  name="ex-badge-type"
  desc="以不同的色彩表达不同的状态"
/>

<fe-code-show
  title="大小"
  name="ex-badge-size"
  desc="不同大小的徽标组件"
/>

<fe-code-show
  title="锚点"
  name="ex-badge-anchor"
  desc="提供一个固定徽标的容器"
/>

<fe-attributes>
  
<fe-attributes-title title="Badge Props" />

| 属性     | 描述               | 类型                        | 可选值                      | 默认      |
| -------- | ------------------ | --------------------------- | --------------------------- | --------- |
| **size** | 组件大小           | `string`                    | [NormalSizes](#normalsizes) | `medium`  |
| **type** | 组件类型           | [NormalTypes](#normaltypes) | [NormalTypes](#normaltypes) | `default` |
| **dot**  | 忽略内容并显示圆点 | `'boolean'`                 | `-`                         | `-`       |
| ...      | 原生属性           | `HTMLAttributes`            | `'class','id',...`          | `-`       |

</fe-attributes>

<fe-attributes>

<fe-attributes-title title="BadgeAnchor Props" />

| 属性          | 描述           | 类型             | 可选值                                               | 默认         |
| ------------- | -------------- | ---------------- | ---------------------------------------------------- | ------------ |
| **placement** | 固定徽标的位置 | `string`         | `'topLeft', 'topRight', 'bottomLeft', 'bottomRight'` | `'topRight'` |
| ...           | 原生属性       | `HTMLAttributes` | `'class','id',...`                                   | `-`          |

</fe-attributes>

<fe-attributes>

<fe-attributes-title title="NormalSizes" />

| 类型 可选值     |
| --------------- |
| **NormalSizes** | `'mini', 'small', 'medium', 'large'` |

</fe-attributes>

<fe-attributes>

<fe-attributes-title title="NormalTypes" />

| 类型            | 可选值                                     |
| --------------- | ------------------------------------------ |
| **NormalTypes** | `'default', 'success', 'warning', 'error'` |

</fe-attributes>
