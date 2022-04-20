## InputNumber

### Default

Basic input field.

:::playground

input-number/default.vue

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
