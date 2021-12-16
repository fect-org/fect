# Input / 输入框

处理用户的输入数据

### 默认的

基础的输入字段

:::playground

input/default.vue

:::

### 尺寸

不同尺寸的输入框

:::playground

input/size.vue

:::

### 标签

在输入框内显示短小地行内文本

:::playground

input/inline-label.vue

:::

### 禁用交互

禁用输入框地所有交互效果

:::playground

input/unwriteable.vue

:::

### 块级标签

为标签自定义更多样式

:::playground

input/block-label.vue

:::

### 清除按钮

在输入框内增加一个用于清除文本的按钮

:::playground

input/clearable.vue

:::

### 密码

显示或隐藏密码文本

:::playground

input/password.vue

:::

### 图标

通过 slot 添加自定义图标

:::playground

input/icon.vue

:::

### Input Props

| 属性           | 描述                                                                            | 类型                | 可选值             | 默认      |
| -------------- | ------------------------------------------------------------------------------- | ------------------- | ------------------ | --------- |
| **v-model**    | 可绑定的输入值                                                                  | `'string','number'` | `-`                | `''`      |
| **prefix**     | 左侧文本标签                                                                    | `'string','number'` | `-`                | `-`       |
| **suffix**     | 右侧文本标签                                                                    | `'string','number'` | `-`                | `-`       |
| **change**     | 输入框变化事件                                                                  | `(e)=>void`         | `-`                | `-`       |
| **clearClick** | 清除按钮的点击事件                                                              | `(e)=>void`         | `-`                | `-`       |
| **clearable**  | 是否展示清除按钮                                                                | `'boolean'`         | `'true','false'`   | `'false'` |
| ...            | 原生属性[文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `InputAttributes`   | `'class','id',...` | `-`       |
