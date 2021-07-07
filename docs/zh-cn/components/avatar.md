# Avatar / 头像

展示用户头像信息

<fe-code-show title="默认的" name="ex-avatar-default" desc="Avatar 组件包含了圆形与方形" />

<fe-code-show title="大小" name="ex-avatar-size" desc="你可以指定组件大小"  />

<fe-code-show title="文本" name="ex-avatar-text" desc="在头像框内用文本替代" />

<fe-code-show title="头像组" name="ex-avatar-stacked" desc="多个头像框可以堆叠在一起" />

<fe-attributes>

<fe-attributes-title title="Avatar Props" />

| 属性          | 描述                    | 类型                | 可选值                            | 默认     |
| ------------- | ----------------------- | ------------------- | --------------------------------- | -------- |
| **stacked**   | 是否堆叠显示            | _boolean_           | -                                 | `false`  |
| **isSquare**  | 是否为方形头像          | `boolean`           | -                                 | `false`  |
| **size**      | 头像大小                | `string`            | `'mini','small','medium','large'` | `medium` |
| **text**      | 文本,无图像链接才会显示 | `string`,`number`   | -                                 | `-`      |
| **src**       | 图像链接                | `string`            | -                                 | `-`      |
| **className** | 图像容器设置 class      | `string`            | -                                 | `-`      |
| ...           | 原生属性                | `ImgHTMLAttributes` | `'alt','class',...`               | `-`      |

</fe-attributes>

<fe-attributes>

<fe-attributes-title title="AvatarGroup Props" />

| 属性      | 描述     | 类型              | 可选值              | 默认 |
| --------- | -------- | ----------------- | ------------------- | ---- |
| **count** | 数量     | `string`,`number` | --                  | --   |
| ...       | 原生属性 | `HTMLAttributes`  | `'alt','class',...` | `-`  |

</fe-attributes>
