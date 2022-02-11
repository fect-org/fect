## Swipe

Display a set of image data to be displayed

### Default

Basic usage.

:::playground

swipe/default.vue

:::

### Auto

loop

:::playground

swipe/loop.vue

:::

### Swipe Props

| Attribue             | Description                            | Type        | Accepted values  | Default |
| -------------------- | -------------------------------------- | ----------- | ---------------- | ------- |
| **duration**         | switching time(milli seconds)          | `'number'`  | `-`              | `300`   |
| **autoplay**         | auto play interval time(milli seconds) | `'number'`  | `-`              | `-`     |
| **loop**             | set loop                               | `'boolean'` | `'true','false'` | `false` |
| **indicator-height** | swipe indicator height                 | `'string'`  | `-`              | `8px`   |
| **indicator-width**  | swipe indicator width                  | `'string'`  | `-`              | `8px`   |
| **inital-value**     | swipe initial value                    | `'number'`  | `-`              | `0`     |
| **show-indicators**  | display indicators                     | `'boolean'` | `'true','false'` | `true`  |
| **indicator-color**  | indicators color                       | `'string'`  | `-`              | `-`     |

### Swipe Event

| Event      | Description  | Type                           |
| ---------- | ------------ | ------------------------------ |
| **change** | index change | `SwipeEvent(idx:number)=>void` |
