---
title: User
name: User
group: Data Display
index: 10
---

Display user profile or social information.

### Default

Show username.

:::playground

user/default.vue

:::

### Description

Show an extra description.

:::playground

user/description.vue

:::

### User Props

| Attribue           | Description                              | Type     | Accepted values | Default |
| ------------------ | ---------------------------------------- | -------- | --------------- | ------- |
| **name(required)** | user name                                | `string` | `-`             | `-`     |
| **src**            | avatar url                               | `string` | `-`             | `-`     |
| **text**           | display text when image is missing       | `-`      | `-`             | `-`     |
| **alt-text**       | alt attribute used by inner avatar image | `-`      | `-`             | `-`     |
