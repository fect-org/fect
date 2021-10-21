# Link / 链接

网页之间的超链接

<playground title="默认的" name="ex-link-default"/>

<playground  title="高亮" desc="以不同的颜色区分链接" name="ex-link-color" />

<playground  title="不同风格的" desc="链接的风格" name="ex-link-more" />

<playground  title="路由跳转" desc="link组件提供了vueRouter push的路由跳转方式" name="ex-link-to" />

<fe-attributes>

<fe-attributes-title title="Link Props" />

| 属性          | 描述               | 类型                   | 可选值                 | 默认    |
| ------------- | ------------------ | ---------------------- | ---------------------- | ------- |
| **href**      | 链接地址           | `string`               | `-`                    | `-`     |
| **to**        | Vue 路由跳转(push) | `'string','object'`    | `-`                    | `-`     |
| **color**     | 是否高亮显示       | `boolean`              | `'true','false'`       | `false` |
| **underline** | 是否显示下划线     | `boolean`              | `'true','false'`       | `false` |
| **block**     | 是否为块级元素     | `boolean`              | `'true','false'`       | `false` |
| ...           | 原生属性           | `AnchorHTMLattributes` | `'rel', 'target', ...` | `-`     |

</fe-attributes>
