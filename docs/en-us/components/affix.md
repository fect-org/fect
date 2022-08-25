---
title: Affix
name: Affix
group: NAVIGATION
index: 0
---

Fix element at area. seem like (fixed: sticky)

### Default

Fix element at the top.

:::playground

affix/default.vue

:::

### Position

Fix element at the bottom.

:::playground

affix/position.vue

:::

### Affix Props

| Attribue     | Description         | Type              | Accepted values  | Default |
| ------------ | ------------------- | ----------------- | ---------------- | ------- |
| **offset**   | offset distance     | `string`,`number` | `-`              | `0`     |
| **z-index**  | fixed z-index level | `number`          | `-`              | `100`   |
| **position** | position for fixed  | `string`          | `'top','bottom'` | `-`     |
