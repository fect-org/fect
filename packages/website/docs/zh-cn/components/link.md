# Link / 链接

网页之间的超链接

### 默认的

:::playground

link/default.vue

:::

### 高亮

以不同的颜色区分链接

:::playground

link/link-color.vue

:::

### 不同风格的

链接的风格

:::playground

link/more.vue

:::

### 路由跳转

`link` 组件提供了 vueRouter push 的路由跳转方式

:::playground

link/to.vue

:::

### Link Props

| 属性          | 描述               | 类型                | 可选值           | 默认    |
| ------------- | ------------------ | ------------------- | ---------------- | ------- |
| **href**      | 链接地址           | `string`            | `-`              | `-`     |
| **to**        | Vue 路由跳转(push) | `'string','object'` | `-`              | `-`     |
| **color**     | 是否高亮显示       | `boolean`           | `'true','false'` | `false` |
| **underline** | 是否显示下划线     | `boolean`           | `'true','false'` | `false` |
| **block**     | 是否为块级元素     | `boolean`           | `'true','false'` | `false` |
