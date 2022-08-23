---
title: Switch 开关
name: Switch
group: '表单'
index: 8
---

显示布尔值的开关控件

### 默认的

:::playground

switch/default.vue

:::

### 禁用

:::playground

switch/disabled.vue

:::

### 尺寸

不同尺寸的`switch`组件

:::playground

switch/size.vue

:::

### Switch Props

| 属性               | 描述             | 类型          | 可选值                               | 默认     |
| ------------------ | ---------------- | ------------- | ------------------------------------ | -------- |
| **v-model**        | 切换状态对应的值 | `any`         | `-`                                  | `-`      |
| **checked-value**  | 选中时对应的值   | `any`         | `-`                                  | `true`   |
| **inactive-value** | 未选中时对应的值 | `any`         | `-`                                  | `false`  |
| **size**           | 开关大小         | `string`      | `'mini', 'small', 'medium', 'large'` | `medium` |
| **disabled**       | 禁用交互         | `boolean`     | `'true','false'`                     | `false`  |
| **change**         | 开关事件         | `SwitchEvent` | `-`                                  | `-`      |
