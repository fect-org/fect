---
title: Toast
name: Toast
group: FEEDBACK
index: 5
---

Display an important message globally.

### Default

Basic usage.

:::playground

toast/default.vue

:::

### Type

:::playground

toast/status.vue

:::

### Static Action

:::playground

toast/static.vue

:::

### Toast Props

| Attribue      | Description           | Type                | Accepted values                            | Default   |
| ------------- | --------------------- | ------------------- | ------------------------------------------ | --------- |
| **text**      | toast message         | `'string','number'` | `-`                                        | `-`       |
| **type**      | toast theme           | `string`            | `'default', 'success', 'warning', 'error'` | `default` |
| **duration**  | toast show time       | `'string','number'` | `-`                                        | `4500`    |
| **closeAble** | show toast close icon | `boolean`           | `'true','false'`                           | `false`   |
