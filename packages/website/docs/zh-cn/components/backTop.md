# BackTop / 回到顶部

返回页面顶部的操作按钮

<playground
  title="默认的"
  name="ex-back-top-default"
  desc="最简单的用法"
/>

<playground
  title="自定义的"
  name="ex-back-top-custom"
  desc="可以自定义回到顶部按钮的样式，限制宽高：40px * 40px"
/>

<attributes>
  
<attributes-title title="BackTop Props" />

| 属性                 | 描述                                                          | 类型                | 可选值 | 默认           |
| -------------------- | ------------------------------------------------------------- | ------------------- | ------ | -------------- |
| **duration**         | 回到顶部的速度(数值越大所用时间越长)                          | `number`            | `-`    | `4`            |
| **target**           | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | `() => HTMLElement` | `-`    | `() => window` |
| **visibilityHeight** | 滚动高度达到此参数值才出现 BackTop                            | `number`            | `-`    | `200`          |
| **right**            | 控制其显示位置, 距离页面右边距                                | `number`            | `-`    | `40`           |
| **bottom**           | 控制其显示位置, 距离页面底部距离                              | `number`            | `-`    | `40`           |

</attributes>
