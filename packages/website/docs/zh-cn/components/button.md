# Button / 按钮

用于触发一个操作

<playground title="默认的" name="ex-button-default" desc="默认Button包含一个动画效果。" />

<playground title="加载中" name="ex-button-loading" desc="Button按钮支持加载状态。" />

<playground title="禁用" name="ex-button-disabled"  desc="禁止Button的一切操作" />

<playground title="阴影" name="ex-button-shadow" desc="使用阴影凸显层级" />

<playground title="类型" name="ex-button-type" desc="不同状态下的按钮" />

<playground title="幽灵" name="ex-button-ghost" desc="底色与主色相反的透明按钮" />

<playground title="尺寸" name="ex-button-size" desc="不同大小下的按钮" />

<playground title="图标" name="ex-button-icon" desc="按钮内的图标色彩和大小将会被自动设置" />

### Button Props

<attributes>

| 属性          | 描述             | 类型                | 可选值                                     | 默认      |
| ------------- | ---------------- | ------------------- | ------------------------------------------ | --------- |
| **type**      | 按钮属性         | `string`            | `'default', 'success', 'warning', 'error'` | `default` |
| **size**      | 按钮大小         | `string`            | `'mini','small','medium','large'`          | `medium`  |
| **ghost**     | 反转按钮颜色     | `boolean`           | `'true','false'`                           | `false`   |
| **effect**    | 是否显示动画效果 | `boolean`           | `'true','false'`                           | `true`    |
| **icon**      | 在按钮内显示图标 | `HTMLElement`       |                                            | `-`       |
| **auto**      | 自动缩放宽度     | `boolean`           | `'true','false'`                           | `false`   |
| **disabled**  | 是否禁用按钮     | `boolean`           | `'true','false'`                           | `false`   |
| **shadow**    | 是否显示阴影     | `boolean`           | `'true','false'`                           | `false`   |
| **loading**   | 是否启用加载中   | `boolean`           | `'true','false'`                           | `false`   |
| **load-type** | 设置加载中的风格 | `string`            | `'default','cube','wave'`                  | `default` |
| _click_       | 点击事件         | `MouseEventHandler` | `-`                                        | `-`       |

</attributes>
