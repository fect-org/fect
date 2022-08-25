---
title: Checkbox 复选框
name: Checkbox
group: '表单'
index: 1
---

用于表示多个可选项

### 默认的

通过 v-model 设置属性的初始状态

:::playground

checkbox/default.vue

:::

### 尺寸

不同大小的复选框

:::playground

checkbox/size.vue

:::

### 组

管理一组 `Checkbox`

:::playground

checkbox/group.vue

:::

### Checkbox Props

| 属性         | 描述       | 类型                | 可选值                               | 默认     |
| ------------ | ---------- | ------------------- | ------------------------------------ | -------- |
| **v-model**  | 是否选中   | `boolean`           | `'true','false'`                     | `false`  |
| **size**     | 复选框大小 | `string`            | `'mini', 'small', 'medium', 'large'` | `medium` |
| **disabled** | 禁用交互   | `boolean`           | `'true','false'`                     | `false`  |
| **label**    | 标识符     | `'string','number'` | `-`                                  | `-`      |
| **change**   | 复选框事件 | `CheckboxEvent`     | `-`                                  | `-`      |

### CheckboxGroup Props

| 属性         | 描述               | 类型            | 可选值                               | 默认     |
| ------------ | ------------------ | --------------- | ------------------------------------ | -------- |
| **v-model**  | 所有选中项的标识符 | `any[]`         | `-`                                  | `[]`     |
| **size**     | 所有复选框大小     | `string`        | `'mini', 'small', 'medium', 'large'` | `medium` |
| **disabled** | 禁用所有交互       | `boolean`       | `'true','false'`                     | `false`  |
| **useRow**   | 水平对齐           | `boolean`       | `-`                                  | `false`  |
| **change**   | 复选框选中值       | `CheckboxEvent` | `-`                                  | `-`      |
