# Breadcrumbs / 面包屑导航

显示用户在应用中的层级位置

### 默认的

```html
<fe-breadcrumbs separator="/">
  <fe-breadcrumbsItem>Home</fe-breadcrumbsItem>
  <fe-breadcrumbsItem>Catalog</fe-breadcrumbsItem>
  <fe-breadcrumbsItem>Page</fe-breadcrumbsItem>
</fe-breadcrumbs>
```

### 分隔符

定制字符中的分隔符

```html
<fe-breadcrumbs separator=">">
  <fe-breadcrumbsItem>Home</fe-breadcrumbsItem>
  <fe-breadcrumbsItem>Catalog</fe-breadcrumbsItem>
  <fe-breadcrumbsItem>Page</fe-breadcrumbsItem>
</fe-breadcrumbs>
```

### 结合 VueRouter

与 vueRouter 结合使用的示例

```html
<fe-breadcrumbs separator="/">
  <fe-breadcrumbsItem>Home</fe-breadcrumbsItem>
  <fe-breadcrumbsItem to="/">Catalog</fe-breadcrumbsItem>
  <fe-breadcrumbsItem href="https://v3.cn.vuejs.org/" target="_blank">Page</fe-breadcrumbsItem>
</fe-breadcrumbs>
```

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
