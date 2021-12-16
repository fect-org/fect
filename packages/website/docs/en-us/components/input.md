# Input

Retrieve text input from a user.

### Default

Basic input field.

:::playground

input/default.vue

:::

### Size

Different size

:::playground

input/size.vue

:::

### Inline Label

Show a short label in the line.

:::playground

input/inline-label.vue

:::

### Disabled

Disable interactive inputs.

:::playground

input/unwriteable.vue

:::

### Block Label

Labels for custom styles.

:::playground

input/block-label.vue

:::

### Clearable

Add a clear button in the input box.

:::playground

input/clearable.vue

:::

### Password

:::playground

input/password.vue

:::

### Icon

Add a custom icon before the input area

:::playground

input/icon.vue

:::

### Input Props

| Attribue      | Description                                                                                   | Type                | Accepted values    | Default   |
| ------------- | --------------------------------------------------------------------------------------------- | ------------------- | ------------------ | --------- |
| **v-model**   | input value                                                                                   | `'string','number'` | `-`                | `''`      |
| **prefix**    | prefix label                                                                                  | `'string','number'` | `-`                | `-`       |
| **suffix**    | suffix label                                                                                  | `'string','number'` | `-`                | `-`       |
| **clearable** | display clearable icon                                                                        | `'boolean'`         | `'true','false'`   | `'false'` |
| ...           | native props more see [docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `InputAttributes`   | `'class','id',...` | `-`       |

### Input Event

| Event           | Description             | Type        |
| --------------- | ----------------------- | ----------- |
| **change**      | input change event      | `(e)=>void` |
| **clear-click** | clean input value event | `(e)=>void` |
