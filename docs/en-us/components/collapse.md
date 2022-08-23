---
title: Collapse
name: Collapse
group: SURFACES
index: 1
---

Display large amounts of text in collapsible sections. Commonly referred to as an accordion.

### Default

Show title only by default.

:::playground

collapse/default.vue

:::

### Expanded

Specify what to display first.

:::playground

collapse/visible.vue

:::

### Shadow

Highlight importance at a higher level.

:::playground

collapse/shadow.vue

:::

### Accordion

Accordion mode

:::playground

collapse/accordion.vue

:::

#### Collapse Props

| Attribue            | Description             | Type          | Accepted values  | Default |
| ------------------- | ----------------------- | ------------- | ---------------- | ------- |
| **title(required)** | collapse title          | `string`      | `-`              | `-`     |
| **subtitle**        | description             | `string`      | `-`              | `-`     |
| **subTag**          | custom subtitle element | `HTMLElement` | `-`              | `-`     |
| **v-model:visible** | expanded                | `boolean`     | `'true','false'` | `false` |
| **shadow**          | show shadow card        | `boolean`     | `'true','false'` | `false` |

#### CollapseGroup Props

| Attribue      | Description          | Type       | Accepted values  | Default  |
| ------------- | -------------------- | ---------- | ---------------- | -------- |
| **accordion** | accordion mode       | `boolean`  | `'true','false'` | `'true'` |
| **v-model**   | current active index | `number[]` | `-`              | `[]`     |
