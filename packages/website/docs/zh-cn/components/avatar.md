# Avatar / 头像

头像代表一个用户或团队，堆叠的头像表示了一个群体。

### 默认的

展示用户的基本信息

:::playground

avatar/default.vue

:::

### 文本

使用文字展示图像

:::playground

avatar/text.vue

:::

### 尺寸

指定图像的大小

:::playground

avatar/size.vue

:::

### 组

多个头像框可以堆叠在一起

:::playground

avatar/stacked.vue

:::

### Avatar Props

| 属性           | 描述                    | 类型              | 可选值                            | 默认     |
| -------------- | ----------------------- | ----------------- | --------------------------------- | -------- |
| **stacked**    | 是否堆叠显示            | `boolean`         | -                                 | `false`  |
| **is-square**  | 是否为方形头像          | `boolean`         | -                                 | `false`  |
| **size**       | 头像大小                | `string`          | `'mini','small','medium','large'` | `medium` |
| **text**       | 文本,无图像链接才会显示 | `string`,`number` | -                                 | `-`      |
| **src**        | 图像链接                | `string`          | -                                 | `-`      |
| **class-name** | 图像容器设置 class      | `string`          | -                                 | `-`      |

### AvatarGroup Props

| 属性      | 描述 | 类型              | 可选值 | 默认 |
| --------- | ---- | ----------------- | ------ | ---- |
| **count** | 数量 | `string`,`number` | --     | --   |
| **stacked**    | 是否堆叠显示              | `boolean`         | `-`                               | `false`  |
| **is-square**  | 所有头像是否为方形头像       | `boolean`         | `-`                               | `false`  |
| **size**       | 所有头像的大小             | `string`          | `'mini','small','medium','large'` | `medium` |
