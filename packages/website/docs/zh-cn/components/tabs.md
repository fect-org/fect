## Tabs / 选项卡

显示选项卡的内容

### 默认的

切换显示不同的内容

:::playground

tabs/default.vue

:::

### 禁用

:::playground

tabs/disabled.vue

:::

### 分割线

隐藏默认的分割线

:::playground

tabs/divider.vue

:::

### Tabs Props

| 属性               | 描述                     | 类型                    | 可选值                | 默认             |
| ------------------ | ------------------------ | ----------------------- | --------------------- | ---------------- |
| **v-model:active** | 绑定当前选中标签的标识符 | `'number','string'`     | `-`                   | `0`              |
| **hide-divider**   | 隐藏默认分割线           | `boolean`               | `-`                   | `false`          |
| **hide-divider**   | 隐藏默认下划线           | `boolean`               | `-`                   | `false`          |
| **change**         | 选项卡切换事件           | `(val)=>void`           | `-`                   | `-`              |
| **click**          | 选项卡点击事件           | `TabsEvent`             | `-`                   | `-`              |
| **hover-ratio**    | hover 块高宽比           | `Record<string,number>` | `{w:number,h:number}` | `{w:1.15,h:0.7}` |

### Tab Props

| 属性         | 描述               | 类型                | 可选值           | 默认    |
| ------------ | ------------------ | ------------------- | ---------------- | ------- |
| **title**    | 选项卡的文字描述   | `'string'`          | `-`              | `-`     |
| **value**    | 绑定选项卡的标识符 | `'string','number'` | `-`              | `-`     |
| **disabled** | 禁用当前选项卡     | `'boolean'`         | `'true','false'` | `false` |

### Tab Slots

| 插槽      | 描述             |
| --------- | ---------------- |
| **label** | 自定义选项卡描述 |
