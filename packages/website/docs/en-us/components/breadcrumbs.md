# Breadcrumbs

Show where users are in the application.

### Default

:::playground

breadcrumbs/default.vue

:::

### Separator

Custom separator in characters.

:::playground

breadcrumbs/separator.vue

:::

### With VueRouter

Example for use with `vue-router`

:::playground

breadcrumbs/router.vue

:::

### Breadcrumbs Props

| Attribue      | Description      | Type     | Accepted values                  | Default  |
| ------------- | ---------------- | -------- | -------------------------------- | -------- |
| **size**      | breadcrumbs size | `string` | `'mini','small,'medium','large'` | `medium` |
| **separator** | separator string | `string` | `-`                              | `/`      |

### BreadcrumbsItem Props

| Attribue | Description      | Type                | Accepted values | Default |
| -------- | ---------------- | ------------------- | --------------- | ------- |
| **href** | link address     | `string`            | `-`             | `-`     |
| **to**   | vue router(push) | `'string','object'` | `-`             | `-`     |
