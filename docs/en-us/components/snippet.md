---
title: Snippet
name: Snippet
group: Common
index: 4
---

Display a snippet of copyable code for the command line.

### Default

Basic usage.

:::playground

snippet/default.vue

:::

### Copy

Supports silent copy and prohibition at the same time

:::playground

snippet/copy.vue

:::

### Type

Show different states with colors.

:::playground

snippet/type.vue

:::

### Filled

:::playground

snippet/filled.vue

:::

### Snippet Props

| Attribue      | Description             | Type                        | Accepted values                  | Default     |
| ------------- | ----------------------- | --------------------------- | -------------------------------- | ----------- |
| **text**      | code snippet            | `string`                    | `-`                              | `-`         |
| **type**      | snippet types           | [NormalTypes](#normaltypes) | [NormalTypes](#normaltypes)      | `default`   |
| **fill**      | filled style            | `boolean`                   | `'true','false'`                 | `false`     |
| **width**     | set CSS string          | `string`                    | `-`                              | `initial`   |
| **copy**      | function of copy button | `CopyTypes`                 | `'default', 'silent', 'prevent'` | `'default'` |
| **symbol**    | symbol snippet          | `String`                    | `-`                              | `$`         |
| **toastText** | toast text              | `String`                    | `-`                              | `-`         |
| **toastType** | toast type              | [NormalTypes](#normaltypes) | [NormalTypes](#normaltypes)      | `default`   |

### NormalTypes

| Event           | Description                                | Type |
| --------------- | ------------------------------------------ | ---- |
| **NormalTypes** | `'default', 'success', 'warning', 'error'` | ---  |
