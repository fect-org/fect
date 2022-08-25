---
title: Snippet 片段
name: Snippet
group: '通用'
index: 4
---

显示可拷贝的命令行代码片段

### 默认的

展示一个指令

:::playground

snippet/default.vue

:::

### 拷贝

片段具有拷贝功能,同时支持静默拷贝和禁止

:::playground

snippet/copy.vue

:::

### 类型

以颜色区分不同的类型

:::playground

snippet/type.vue

:::

### 填充

以颜色区分不同的类型

:::playground

snippet/filled.vue

:::

### Snippet Props

| 属性          | 描述               | 类型                        | 可选值                           | 默认        |
| ------------- | ------------------ | --------------------------- | -------------------------------- | ----------- |
| **text**      | 文本               | `string`                    | `-`                              | `-`         |
| **type**      | 组件类型           | [NormalTypes](#normaltypes) | [NormalTypes](#normaltypes)      | `default`   |
| **fill**      | 填充风格的样式     | `boolean`                   | `'true','false'`                 | `false`     |
| **width**     | 设置组件宽度       | `string`                    | `-`                              | `initial`   |
| **copy**      | 拷贝的工作方式     | `CopyTypes`                 | `'default', 'silent', 'prevent'` | `'default'` |
| **symbol**    | 组件左侧显示的字符 | `String`                    | `-`                              | `$`         |
| **toastText** | 拷贝提示的字符     | `String`                    | `-`                              | `-`         |
| **toastType** | 拷贝提示的样式     | [NormalTypes](#normaltypes) | [NormalTypes](#normaltypes)      | `default`   |

### NormalTypes

| 类型 可选值     |                                            |
| --------------- | ------------------------------------------ |
| **NormalTypes** | `'default', 'success', 'warning', 'error'` |
