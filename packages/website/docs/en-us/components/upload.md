## Upload

### Default

Basic usage.

:::playground

upload/default.vue

:::

### Upload Props

| Attribue       | Description                                                                                                           | Type                        | Accepted values  | Default |
| -------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------- | ------- |
| **assets**     | file list                                                                                                             | `any[]`                     | `-`              | `[]`    |
| **accept**     | accepted[file type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers) | `string`                    | `-`              | `-`     |
| **multiple**   | enable multiple                                                                                                       | `boolean`                   | `'true','false'` | `false` |
| **disabled**   | disabled the upload                                                                                                   | `boolean`                   | `'true','false'` | `false` |
| **readonly**   | readonly the upload                                                                                                   | `boolean`                   | `'true','false'` | `false` |
| **limit**      | limit upload count                                                                                                    | `number`                    | `-`              | `-`     |
| **beforeRead** | hook before reading the file, return false to stop reading the file, can return Promise                               | `(files)=>boolean \| files` | `-`              | `-`     |
| **afterRead**  | hook after reading the file                                                                                           | `(files)=>void`             | `-`              | `-`     |

### Uplaod Events

| Event      | Description                      | Type            |
| ---------- | -------------------------------- | --------------- |
| **exceed** | trigger when the limit is exceed | `(files)=>void` |
