# Avatar / 头像

展示用户头像信息

### 默认的

展示用户的基本信息

```html
<fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" /> <fe-avatar text="fect" />
```

### 尺寸

指定图像的大小

```html
<fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" size="mini" />
<fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" size="small" />
<fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" size="medium" />
<fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" size="large" />
```

### 组

多个头像框可以堆叠在一起

```html
<fe-avatar-group>
  <fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" size="small" stacked />
  <fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" size="small" stacked />
  <fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" size="small" stacked />
  <fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" size="small" stacked />
</fe-avatar-group>
<fe-spacer />
<fe-avatar-group :count="12">
  <fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" is-square size="small" stacked />
  <fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" is-square size="small" stacked />
  <fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" is-square size="small" stacked />
  <fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" is-square size="small" stacked />
</fe-avatar-group>
```

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
