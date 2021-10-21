# Tabs / 选项卡

显示选项卡的内容

<playground
  title="默认的"
  name="ex-tabs-default"
  desc="切换显示不同的内容"
/>

<playground
  title="分割线"
  name="ex-tabs-disabled"
/>

<playground
  title="分割线"
  name="ex-tabs-divider"
  desc="隐藏默认的分割线"
/>

<fe-attributes>
  
<fe-attributes-title title="Tabs Props" />

| 属性               | 描述                     | 类型                | 可选值               | 默认    |
| ------------------ | ------------------------ | ------------------- | -------------------- | ------- |
| **v-model:active** | 绑定当前选中标签的标识符 | `'number','string'` | `-`                  | `0`     |
| **hideDivider**    | 隐藏默认分割线           | `boolean`           | `-`                  | `false` |
| **change**         | 选项卡切换事件           | `(val)=>void`       | `-`                  | `-`     |
| **click**          | 选项卡点击事件           | `TabsEvent`         | `-`                  | `-`     |
| ...                | 原生属性                 | `HTMLAttributes`    | `'class','name',...` | `-`     |

</fe-attributes>

<fe-attributes>

<fe-attributes-title title="Tab Props" />

| 属性         | 描述               | 类型                | 可选值               | 默认    |
| ------------ | ------------------ | ------------------- | -------------------- | ------- |
| **title**    | 选项卡的文字描述   | `'string'`          | `-`                  | `-`     |
| **value**    | 绑定选项卡的标识符 | `'string','number'` | `-`                  | `-`     |
| **disabled** | 禁用当前选项卡     | `'boolean'`         | `'true','false'`     | `false` |
| ...          | 原生属性           | `HTMLAttributes`    | `'class','name',...` | `-`     |

</fe-attributes>
