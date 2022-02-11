## Tabs

Display tab content.

### Default

Toggle display of different templates.

:::playground

tabs/default.vue

:::

### 禁用

:::playground

tabs/disabled.vue

:::

### Hide Divider

:::playground

tabs/divider.vue

:::

### Tabs Props

| Attribue           | Description                  | Type                | Accepted values | Default |
| ------------------ | ---------------------------- | ------------------- | --------------- | ------- |
| **v-model:active** | current acitve binding value | `'number','string'` | `-`             | `0`     |
| **hide-divider**   | hide default divider         | `boolean`           | `-`             | `false` |
| **change**         | 选项卡切换事件               | `(val)=>void`       | `-`             | `-`     |
| **click**          | 选项卡点击事件               | `TabsEvent`         | `-`             | `-`     |

### Tab Props

| Attribue     | Description         | Type                | Accepted values  | Default |
| ------------ | ------------------- | ------------------- | ---------------- | ------- |
| **title**    | display tab's label | `'string'`          | `-`              | `-`     |
| **value**    | unique ident value  | `'string','number'` | `-`              | `-`     |
| **disabled** | disable current tab | `'boolean'`         | `'true','false'` | `false` |

### Swipe Event

| Event      | Description  | Type          |
| ---------- | ------------ | ------------- |
| **change** | change event | `(val)=>void` |
| **click**  | click Event  | `TabsEvent`   |
