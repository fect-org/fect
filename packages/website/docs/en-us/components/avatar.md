## Avatar

Avatars represent a user or a team. Stacked avatars represent a group of people.

### Default

Display user avatar information

:::playground

avatar/default.vue

:::

### Text

Display text in avatar box

:::playground

avatar/text.vue

:::

### Size

Avatar has different sizes

:::playground

avatar/size.vue

:::

### Group

Multiple avatars can overlap and stack together.

:::playground

avatar/stacked.vue

:::

### Avatar Props

| Attribue       | Description                        | Type              | Accepted values                   | Default  |
| -------------- | ---------------------------------- | ----------------- | --------------------------------- | -------- |
| **stacked**    | stacked display group              | `boolean`         | `-`                               | `false`  |
| **is-square**  | avatar shape                       | `boolean`         | `-`                               | `false`  |
| **size**       | avatar size                        | `string`          | `'mini','small','medium','large'` | `medium` |
| **text**       | display text when image is missing | `string`,`number` | `-`                               | `-`      |
| **src**        | image src                          | `string`          | `-`                               | `-`      |
| **class-name** | avatar box class                   | `string`          | `-`                               | `-`      |

### AvatarGroup Props

| Attribue  | Description                              | Type              | Accepted values | Default |
| --------- | ---------------------------------------- | ----------------- | --------------- | ------- |
| **count** | showttotal numbers                       | `string`,`number` | `-`             | `-`     |
| ...       | stacked, is-square, size of Avatar props | `-`               | `-`             | `-`     |
