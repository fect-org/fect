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

| Attribue           | Description                  | Type                    | Accepted values       | Default          |
| ------------------ | ---------------------------- | ----------------------- | --------------------- | ---------------- |
| **v-model:active** | current acitve binding value | `'number','string'`     | `-`                   | `0`              |
| **hide-divider**   | hide default divider         | `boolean`               | `-`                   | `false`          |
| **hide-border**    | hide tab border              | `boolean`               | `-`                   | `false`          |
| **hover-ratio**    | hover block ratio            | `Record<string,number>` | `{w:number,h:number}` | `{w:1.15,h:0.7}` |

### Tab Props

| Attribue     | Description         | Type                | Accepted values  | Default |
| ------------ | ------------------- | ------------------- | ---------------- | ------- |
| **title**    | display tab's label | `'string'`          | `-`              | `-`     |
| **value**    | unique ident value  | `'string','number'` | `-`              | `-`     |
| **disabled** | disable current tab | `'boolean'`         | `'true','false'` | `false` |

### Tabs Event

| Event      | Description  | Type          |
| ---------- | ------------ | ------------- |
| **change** | change event | `(val)=>void` |
| **click**  | click Event  | `TabsEvent`   |

### Tab Slots

| Slot name | Description               |
| --------- | ------------------------- |
| **label** | define custom tab's label |
