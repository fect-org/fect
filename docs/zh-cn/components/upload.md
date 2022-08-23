---
title: Upload 文件上传
name: Upload
group: '表单'
index: 6
---

### 默认的

基础示例

:::playground

upload/default.vue

:::

### Upload Props

| 属性           | 描述                                                 | 类型                        | 可选值           | 默认    |
| -------------- | ---------------------------------------------------- | --------------------------- | ---------------- | ------- |
| **assets**     | 文件列表                                             | `any[]`                     | `-`              | `[]`    |
| **accept**     | 接受上传的文件类型                                   | `string`                    | `-`              | `-`     |
| **multiple**   | 是否支持多选文件                                     | `boolean`                   | `'true','false'` | `false` |
| **disabled**   | 禁用上传                                             | `boolean`                   | `'true','false'` | `false` |
| **readonly**   | 只读                                                 | `boolean`                   | `'true','false'` | `false` |
| **limit**      | 限制上传数量                                         | `number`                    | `-`              | `-`     |
| **beforeRead** | 上传文件之前的钩子，参数为上传的文件支持返回 promise | `(files)=>boolean \| files` | `-`              | `-`     |
| **afterRead**  | 文件读取完成后的回调函数                             | `(files)=>void`             | `-`              | `-`     |

### Uplaod Events

| 事件       | 描述             | 类型            |
| ---------- | ---------------- | --------------- |
| **exceed** | 超出文件限制触发 | `(files)=>void` |
