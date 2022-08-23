---
title: Select 选择框
name: Select
group: '表单'
index: 7
---

### 默认的

:::playground

select/default.vue

:::

### 尺寸

组件具有不同的大小

:::playground

select/size.vue

:::

### 多选的

组件支持同时选中多个值

:::playground

select/multiple.vue

:::

### 禁用的

禁用所有的交互

:::playground

select/disabled.vue

:::

### 禁用选项

禁用指定的选项

:::playground

select/disableOption.vue

:::

### Select Props

| 属性            | 描述                   | 类型                        | 可选值                      | 默认      |
| --------------- | ---------------------- | --------------------------- | --------------------------- | --------- |
| **modelValue**  | 选择器的值             | `'string','string[]'`       | `-`                         | `-`       |
| **placeholder** | 占位文本内容           | `string`                    | `-`                         | `-`       |
| **multiple**    | 是否支持多选           | `Boolean`                   | `-`                         | `false`   |
| **size**        | 选择器组件大小         | [NormalSizes](#normalsizes) | [NormalTypes](#normalsizes) | `medium`  |
| **width**       | 设置组件宽度           | `string`                    | `-`                         | `initial` |
| **clearable**   | 是否展示移除图标       | `Boolean`                   | `-`                         | `true`    |
| **disabled**    | 是否禁用交互           | `Boolean`                   | `-`                         | `false`   |
| **change**      | 选项被选中所触发的事件 | `(e)=>void`                 | `-`                         | `-`       |

### Option Props

| 属性         | 描述           | 类型      | 可选值 | 默认    |
| ------------ | -------------- | --------- | ------ | ------- |
| **value**    | 唯一鉴别值     | `string`  | `-`    | `-`     |
| **label**    | 展示的文本内容 | `string`  | `-`    | `-`     |
| **disabled** | 是否禁用交互   | `Boolean` | `-`    | `false` |

### NormalSizes

| 类型 可选值     |                                      |
| --------------- | ------------------------------------ |
| **NormalSizes** | `'mini', 'small', 'medium', 'large'` |
