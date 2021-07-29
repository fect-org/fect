# switch / 开关

显示布尔值的开关控件

<fe-code-show title="默认的" name="ex-switch-default" />

<fe-code-show title="禁用" name="ex-switch-disabled" />

<fe-code-show title="尺寸" desc="switch组件支持修改大小" name="ex-switch-size" />

<fe-attributes>
  
<fe-attributes-title title="Spacer Props" />

| 属性               | 描述             | 类型                  | 可选值                               | 默认     |
| ------------------ | ---------------- | --------------------- | ------------------------------------ | -------- |
| **v-model**        | 切换状态对应的值 | `any`                 | `-`                                  | `-`      |
| **checked-value**  | 选中时对应的值   | `any`                 | `-`                                  | `true`   |
| **inactive-value** | 未选中时对应的值 | `any`                 | `-`                                  | `false`  |
| **size**           | 开关大小         | `string`              | `'mini', 'small', 'medium', 'large'` | `medium` |
| **disabled**       | 禁用交互         | `boolean`             | `'true','false'`                     | `false`  |
| **change**         | 开关事件         | `SwitchEvent`         | `-`                                  | `-`      |
| ...                | 原生属性         | `LabelHTMLAttributes` | `'class','name',...`                 | `-`      |

</fe-attributes>
