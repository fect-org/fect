## Slider

Display the current value and an inputable range.

### Default

Accept clicks or drag actions.

:::playground

slider/default.vue

:::

### Step

Different granularity.

:::playground

slider/step.vue

:::

### Range

Specifies the maximum or minimum value of the Slider.

:::playground

slider/range.vue

:::

### Slider Props

| Attribue         | Description                                        | Type      | Accepted values  | Default |
| ---------------- | -------------------------------------------------- | --------- | ---------------- | ------- |
| **v-model**      | slider value                                       | `number`  | `-`              | `0`     |
| **step**         | the granularity the slider can step through values | `number`  | `-`              | `1`     |
| **max**          | the maximum value of slider                        | `number`  | `-`              | `100`   |
| **min**          | the minimum value of slider                        | `number`  | `-`              | `0`     |
| **disabled**     | disable slider interaction                         | `boolean` | `'true','false'` | `false` |
| **show-markers** | show each marker                                   | `boolean` | `'true','false'` | `false` |
| **hide-value**   | hide slider value                                  | `boolean` | `'true','false'` | `false` |

### Slider Events

| Event      | Description                             | Type                   |
| ---------- | --------------------------------------- | ---------------------- |
| **change** | called when the value of silder changes | `(value:number)=>void` |
