# Breadcrumbs / 面包屑导航

显示用户在应用中的层级位置

<playground name="ex-breadcrumbs-default" title="默认的" />
<playground name="ex-breadcrumbs-size" title="大小" />
<playground
  name="ex-breadcrumbs-separator"
  title="分隔符"
  desc="定制字符中的分隔符"
/>

<playground
  name="ex-breadcrumbs-router"
  title="结合VueRouter"
  desc="与 vueRouter 结合使用的示例"
/>

<attributes>
  
<attributes-title title="Breadcrumbs Props" />

| 属性          | 描述     | 类型             | 可选值                           | 默认     |
| ------------- | -------- | ---------------- | -------------------------------- | -------- |
| **size**      | 组件大小 | `string`         | `'mini','small,'medium','large'` | `medium` |
| **separator** | 分隔符   | `string`         | `-`                              | `/`      |
| ...           | 原生属性 | `HTMLAttributes` | `'class','id',...`               | `-`      |

</attributes>

<attributes>

<attributes-title title="BreadcrumbsItem Props" />

| 属性     | 描述               | 类型                | 可选值              | 默认 |
| -------- | ------------------ | ------------------- | ------------------- | ---- |
| **href** | 链接地址           | `string`            | `-`                 | `-`  |
| **to**   | Vue 路由跳转(push) | `'string','object'` | `-`                 | `-`  |
| ...      | 原生属性           | `LinkAttributes`    | `'target','id',...` | `-`  |

</attributes>
