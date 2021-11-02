# Capacity / 容量

显示一个容量指示器

### 默认的

```html
<fe-capacity value="30" />
<fe-spacer :y="0.5" />
<fe-capacity value="60" />
<fe-spacer :y="0.5" />
<fe-capacity value="80" />
```

### 固定颜色

指定一个默认颜色进行覆盖

```html
<fe-capacity value="30" color="green" />
```

### Capacity Props

| 属性      | 描述                | 类型                | 可选值 | 默认 |
| --------- | ------------------- | ------------------- | ------ | ---- |
| **value** | 当前的容量值        | `'string','number'` | `-`    | `0`  |
| **color** | 自定义容量 css 颜色 | `string`            | `-`    | `-`  |
