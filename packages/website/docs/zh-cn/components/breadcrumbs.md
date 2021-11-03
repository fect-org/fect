# Breadcrumbs / 面包屑导航

显示用户在应用中的层级位置

### 默认的

:::playground

breadcrumbs/default.vue

:::

### 分隔符

定制字符中的分隔符

:::playground

breadcrumbs/separator.vue

:::

### 结合 VueRouter

与 vueRouter 结合使用的示例

:::playground

breadcrumbs/router.vue

:::

### Breadcrumbs Props

| 属性          | 描述     | 类型     | 可选值                           | 默认     |
| ------------- | -------- | -------- | -------------------------------- | -------- |
| **size**      | 组件大小 | `string` | `'mini','small,'medium','large'` | `medium` |
| **separator** | 分隔符   | `string` | `-`                              | `/`      |

### BreadcrumbsItem Props

| 属性     | 描述               | 类型                | 可选值 | 默认 |
| -------- | ------------------ | ------------------- | ------ | ---- |
| **href** | 链接地址           | `string`            | `-`    | `-`  |
| **to**   | Vue 路由跳转(push) | `'string','object'` | `-`    | `-`  |
