## Radio / 单选框

提供用户输入的选择项

### 默认的

:::playground

radio/default.vue

:::

### 组

一组可控选择的数值

:::playground

radio/group.vue

:::

### 更多的

:::playground

radio/more.vue

:::

### Radio Props

| 属性                | 描述                           | 类型            | 可选值                               | 默认     |
| ------------------- | ------------------------------ | --------------- | ------------------------------------ | -------- |
| **v-model:checked** | 是否选中单选框(仅在单选时有效) | `boolean`       | `'true','false'`                     | `false`  |
| **disabed**         | 禁用当前选项                   | `boolean`       | `'true','false'`                     | `false`  |
| **value**           | 单选框的值(必填)               | `string,number` | `-`                                  | `-`      |
| **size**            | 单选框的大小                   | `string`        | `'mini', 'small', 'medium', 'large'` | `medium` |
| **change**          | 选项变化事件                   | `RadioEvent`    | `-`                                  | `-`      |

### RadioGroup Props

| 属性         | 描述                 | 类型         | 可选值                               | 默认     |
| ------------ | -------------------- | ------------ | ------------------------------------ | -------- |
| **v-model**  | 初始值               | `string`     | `-`                                  | `-`      |
| **useRow**   | 水平对齐所有子单选框 | `boolean`    | `'true','false'`                     | `false`  |
| **disabled** | 禁用所有单选框       | `boolean`    | `'true','false'`                     | `false`  |
| **size**     | 组内所有单选框大小   | `string`     | `'mini', 'small', 'medium', 'large'` | `medium` |
| **change**   | radio 的值变化事件   | `RadioEvent` | `-`                                  | `-`      |
