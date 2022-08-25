---
title: Image
name: Image
group: Data Display
index: 7
---

Display image data.

### Default

:::playground

image/default.vue

:::

### Skeleton

:::playground

image/skeleton.vue

:::

### With Browser

Add a browser style wrapper to the image.

:::playground

image/browser.vue

:::

### Invert

Inver browser style.

:::playground

image/invert.vue

:::

### Image Props

| Attribue      | Description               | Type                | Accepted values  | Default |
| ------------- | ------------------------- | ------------------- | ---------------- | ------- |
| **src**       | image src                 | `string`            | `-`              | `-`     |
| **width**     | image width               | `string`            | `-`              | `atuo`  |
| **height**    | image heigth              | `string`            | `-`              | `atuo`  |
| **skeleton**  | use skeleton animation    | `boolean`           | `'true','false'` | `false` |
| **max-delay** | max duration of animation | `'string','number'` | `-`              | `3000`  |

### ImageBrowser Props

| Attribue           | Description                           | Type      | Accepted values  | Default |
| ------------------ | ------------------------------------- | --------- | ---------------- | ------- |
| **title**          | show text title (when "url" is unset) | `string`  | `-`              | `-`     |
| **url**            | show url on browser address input     | `string`  | `-`              | `-`     |
| **show-full-link** | show full url                         | `boolean` | `'true','false'` | `false` |
| **invert**         | invert colors                         | `boolean` | `'true','false'` | `false` |
