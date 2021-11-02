# Image / 图片

用于展示图象数据

<playground title="默认的" name="ex-image-default" />
<playground title="骨架" name="ex-image-skeleton" />
<playground title="浏览器风格" desc="为图片增加浏览器风格的外装饰" name="ex-image-browser" />
<playground title="反转的浏览器风格" name="ex-image-invert" />

### Image Props

<attributes>

| 属性         | 描述                    | 类型                | 可选值           | 默认值  |
| ------------ | ----------------------- | ------------------- | ---------------- | ------- |
| **src**      | 图片地址                | `string`            | `-`              | `-`     |
| **width**    | 宽度                    | `string`            | `-`              | `atuo`  |
| **height**   | 高度                    | `string`            | `-`              | `atuo`  |
| **skeleton** | 启用骨架屏动画          | `boolean`           | `'true','false'` | `false` |
| **maxDelay** | 动画持续最大时间 (毫秒) | `'string','number'` | `-`              | `3000`  |

</attributes>

### ImageBrowser Props

<attributes>

| 属性             | 描述                             | 类型      | 可选值           | 默认值  |
| ---------------- | -------------------------------- | --------- | ---------------- | ------- |
| **title**        | 显示标题 (当 "url" 未设置时生效) | `string`  | `-`              | `-`     |
| **url**          | 在浏览器地址栏显示链接           | `string`  | `-`              | `-`     |
| **showFullLink** | 显示完整的链接而非域名           | `boolean` | `'true','false'` | `false` |
| **invert**       | 反转地址栏颜色                   | `boolean` | `'true','false'` | `false` |

</attributes>
