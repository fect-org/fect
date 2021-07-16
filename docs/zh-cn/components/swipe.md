# Swipe / 轮播

显示一组需要展示的图象数据

<fe-code-show
  title="默认的"
  name="ex-swipe-default"
  desc="具备基础风格的轮播图"
/>

<fe-code-show
  title="自动的"
  name="ex-swipe-loop"
  desc="通过loop开启循环轮播"
/>

<fe-attributes>
  
<fe-attributes-title title="Swipe Props" />

| 属性                | 描述                   | 类型                    | 可选值             | 默认    |
| ------------------- | ---------------------- | ----------------------- | ------------------ | ------- |
| **duration**        | 切换过度时间(毫秒)     | `'number'`              | `-`                | `300`   |
| **autoplay**        | 自动播放间隔时间(毫秒) | `'number'`              | `-`                | `-`     |
| **loop**            | 是否开启循环轮播       | `'boolean'`             | `'true','false'`   | `false` |
| **indicatorHeight** | 指示器的高度           | `'string'`              | `-`                | `8px`   |
| **indicatorWidth**  | 指示器的宽度           | `'string'`              | `-`                | `8px`   |
| **initalValue**     | 初始化显示的索引       | `'number'`              | `-`                | `0`     |
| **showIndicators**  | 是否显示指示器         | `'boolean'`             | `'true','false'`   | `true`  |
| **indicatorColor**  | 设置指示器的颜色       | `'string'`              | `-`                | `-`     |
| **change**          | 索引值变化事件         | `'SwipeEvent()=>index'` | `-`                | `-`     |
| ...                 | 原生属性               | `HTMLAttributes`        | `'class','id',...` | `-`     |

</fe-attributes>
