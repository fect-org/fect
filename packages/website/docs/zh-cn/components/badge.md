# Badge / 徽标

显示一个徽标(它具有提示的意义)

### 默认的

展示一个数字或者一段文字

```html
<fe-badge>1</fe-badge>
<fe-spacer />
<fe-badge>5</fe-badge>
<fe-spacer />
<fe-badge>10</fe-badge>
<fe-spacer />
```

### 类型

以不同的色彩表达不同的状态

```html
<fe-badge type="success">success</fe-badge>
<fe-spacer />
<fe-badge type="warning">warning</fe-badge>
<fe-spacer />
<fe-badge type="error">error</fe-badge>
<fe-spacer />
```

### 大小

不同大小的徽标组件

```html
<fe-badge size="mini">mini</fe-badge>
<fe-spacer />
<fe-badge size="small">small</fe-badge>
<fe-spacer />
<fe-badge size="medium">medium</fe-badge>
<fe-spacer />
<fe-badge size="large">large</fe-badge>
```

### 锚点

将徽章固定在指定位置

```html
<fe-badgeAnchor>
  <fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" size="medium" />
  <fe-badge type="success" dot></fe-badge>
</fe-badgeAnchor>
<fe-spacer inline :x="1.1" />
<fe-badgeAnchor>
  <fe-avatar src="https://avatars.githubusercontent.com/u/52351095?v=4" size="medium" is-square />
  <fe-badge type="success" dot></fe-badge>
</fe-badgeAnchor>
<fe-spacer inline :x="1.1" />
<fe-badgeAnchor>
  <fe-button auto size="mini">Button</fe-button>
  <fe-badge type="error" size="small">999</fe-badge>
</fe-badgeAnchor>
```

### Badge Props

| 属性     | 描述               | 类型                        | 可选值                      | 默认      |
| -------- | ------------------ | --------------------------- | --------------------------- | --------- |
| **size** | 组件大小           | `string`                    | [NormalSizes](#normalsizes) | `medium`  |
| **type** | 组件类型           | [NormalTypes](#normaltypes) | [NormalTypes](#normaltypes) | `default` |
| **dot**  | 忽略内容并显示圆点 | `'boolean'`                 | `-`                         | `-`       |

### BadgeAnchor Props

| 属性          | 描述           | 类型     | 可选值                                               | 默认         |
| ------------- | -------------- | -------- | ---------------------------------------------------- | ------------ |
| **placement** | 固定徽标的位置 | `string` | `'topLeft', 'topRight', 'bottomLeft', 'bottomRight'` | `'topRight'` |

### NormalSizes

| 类型 可选值     |                                      |
| --------------- | ------------------------------------ |
| **NormalSizes** | `'mini', 'small', 'medium', 'large'` |

### NormalTypes

| 类型            | 可选值                                     |
| --------------- | ------------------------------------------ |
| **NormalTypes** | `'default', 'success', 'warning', 'error'` |
