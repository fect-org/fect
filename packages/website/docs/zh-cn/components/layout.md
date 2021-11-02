# layout / 布局

以简易的方式构建页面布局

<playground title="默认的" desc="row组件可以创建一个行容器" name="ex-layout-default" />

<playground title="列" desc="col组件可以创建不同宽度的列容器" name="ex-layout-column" />

<playground title="间距" desc="在row组件上指定子元素 (列) 的间距" name="ex-layout-spacer" />

<playground title="组合" desc="使用 1/24 列完成布局" name="ex-layout-compose" />

<playground title="对齐" desc="使用 justify 与 align 属性以不同方式对齐列" name="ex-layout-align" />

### Row Props

<attributes>

| 属性        | 描述           | 类型                | 可选值                                                   | 默认    |
| ----------- | -------------- | ------------------- | -------------------------------------------------------- | ------- |
| **tag**     | 自定义容器元素 | `HTMLElemenet`      | `-`                                                      | `div`   |
| **gutter**  | 子元素列的间距 | `'string','number'` | `-`                                                      | `0`     |
| **justify** | 水平对齐方式   | `string`            | `'start','end','center','space-around','space-between',` | `start` |
| **align**   | 垂直对齐方式   | `string`            | `'top', 'middle', 'bottom'`                              | `top`   |

</attributes>

### Col Props

<attributes>

| 属性       | 描述               | 类型                | 可选值   | 默认  |
| ---------- | ------------------ | ------------------- | -------- | ----- |
| **tag**    | 自定义容器元素     | `HTMLElement`       | `-`      | `div` |
| **span**   | 每列占据的网格大小 | `'string','number'` | `'0-24'` | `24`  |
| **offset** | 当前列的偏移位置   | `'string','number'` | `-`      | `0`   |

</attributes>
