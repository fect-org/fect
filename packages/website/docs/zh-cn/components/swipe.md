## Swipe / 轮播

显示一组需要展示的图象数据

### 默认的

具备基础风格的轮播图

:::playground

swipe/default.vue

:::

### 自动的

通过 loop 开启循环轮播

:::playground

swipe/loop.vue

:::

### Swipe Props

| 属性                | 描述                   | 类型                    | 可选值           | 默认    |
| ------------------- | ---------------------- | ----------------------- | ---------------- | ------- |
| **duration**        | 切换过度时间(毫秒)     | `'number'`              | `-`              | `300`   |
| **autoplay**        | 自动播放间隔时间(毫秒) | `'number'`              | `-`              | `-`     |
| **loop**            | 是否开启循环轮播       | `'boolean'`             | `'true','false'` | `false` |
| **indicatorHeight** | 指示器的高度           | `'string'`              | `-`              | `8px`   |
| **indicatorWidth**  | 指示器的宽度           | `'string'`              | `-`              | `8px`   |
| **initalValue**     | 初始化显示的索引       | `'number'`              | `-`              | `0`     |
| **showIndicators**  | 是否显示指示器         | `'boolean'`             | `'true','false'` | `true`  |
| **indicatorColor**  | 设置指示器的颜色       | `'string'`              | `-`              | `-`     |
| **change**          | 索引值变化事件         | `'SwipeEvent()=>index'` | `-`              | `-`     |
