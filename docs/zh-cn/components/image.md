# Image / 图片

用于展示图象数据

<fe-code-show title="默认的" name="ex-image-default" />
<fe-code-show title="骨架" name="ex-image-skeleton" />
<fe-code-show title="浏览器风格" desc="为图片增加浏览器风格的外装饰" name="ex-image-browser" />
<fe-code-show title="反转的浏览器风格" name="ex-image-invert" />

<fe-attributes>

<fe-attributes-title title="Image Props" />

| 属性             | 描述                             | 类型                | 可选值                   | 默认值  |
| ---------------- | -------------------------------- | ------------------- | ------------------------ | ------- |
| **src**          | 图片地址                         | `string`            | `-`                      | `-`     |
| **width**        | 宽度                             | `string`            | `-`                      | `atuo`  |
| **height**       | 高度                             | `string`            | `-`                      | `atuo`  |
| **skeleton**     | 启用骨架屏动画                   | `boolean`           | `'true','false'`         | `false` |
| **maxDelay**     | 动画持续最大时间 (毫秒)          | `'string','number'` | `-`                      | `3000`  |
| **useBrowser**   | 启用浏览器风格                   | `boolean`           | `'true','false'`         | `false` |
| **title**        | 显示标题 (当 "url" 未设置时生效) | `string`            | `-`                      | `-`     |
| **url**          | 在浏览器地址栏显示链接           | `string`            | `-`                      | `-`     |
| **showFullLink** | 显示完整的链接而非域名           | `boolean`           | `'true','false'`         | `false` |
| **invert**       | 反转地址栏颜色                   | `boolean`           | `'true','false'`         | `false` |
| ...              | 原生属性                         | `ImgHTMLAttributes` | `'class','id','alt',...` | `-`     |

</fe-attributes>
