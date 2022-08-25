---
title: Code
name: Code
group: Common
index: 2
---

Show source code in a standardized way.

### Default

Basic inline codes.

:::playground

code/default.vue

:::

### Code Block

Multi line code display.

:::playground

code/block.vue

:::

### Code Classic

Multi line code display for classic mode.

:::playground

code/classic.vue

:::

### Code Props

| Attribue    | Description                                 | Type      | Accepted values  | Default |
| ----------- | ------------------------------------------- | --------- | ---------------- | ------- |
| **block**   | show code in `pre`                          | `boolean` | `'true','false'` | `false` |
| **name**    | text displayed at the top of the code block | `string`  | `-`              | `-`     |
| **classic** | display with classic style                  | `boolean` | `-`              | `false` |
