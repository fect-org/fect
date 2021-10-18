# Snippet / 片段

显示可拷贝的命令行代码片段

<fe-code-show title="默认的" desc="展示一个命令" name="ex-snippet-default" />

<fe-code-show
  title="拷贝"
  desc="片段具有拷贝功能,同时支持静默拷贝和禁止"
  name="ex-snippet-copy"
/>

<fe-code-show
  title="类型"
  desc="以颜色区分不同的类型"
  name="ex-snippet-type"
/>

<fe-code-show
  title="填充"
  name="ex-snippet-filled"
/>

<fe-attributes>
  
<fe-attributes-title title="Snippet Props" />

| 属性          | 描述               | 类型                        | 可选值                           | 默认        |
| ------------- | ------------------ | --------------------------- | -------------------------------- | ----------- |
| **text**      | 文本               | `string`                    | `-`                              | `-`         |
| **type**      | 组件类型           | [NormalTypes](#normaltypes) | [NormalTypes](#normaltypes)      | `default`   |
| **fill**      | 填充风格的样式     | `boolean`                   | `'true','false'`                 | `false`     |
| **width**     | 设置组件宽度       | `string`                    | `-`                              | `initial`   |
| **copy**      | 拷贝的工作方式     | `CopyTypes`                 | `'default', 'silent', 'prevent'` | `'default'` |
| **symbol**    | 组件左侧显示的字符 | `String`                    | `-`                              | `$`         |
| **toastText** | 拷贝提示的字符     | `String`                    | `-`                              | `-`         |
| **toastType** | 拷贝提示的样式     | [NormalTypes](#normaltypes) | [NormalTypes](#normaltypes)      | `default`   |
| ...           | 原生属性           | `HTMLAttributes`            | `'class','id',...`               | `-`         |

</fe-attributes>

<fe-attributes>

<fe-attributes-title title="NormalTypes" />

| 类型 可选值     |
| --------------- | ------------------------------------------ |
| **NormalTypes** | `'default', 'success', 'warning', 'error'` |

</fe-attributes>
