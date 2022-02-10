## Modal / 对话框

弹出显示需要注意的通知项

### 默认的

使用 v-model:visible 控制显示隐藏

:::playground

modal/default.vue

:::

### 定制化

使用插槽定制内容

:::playground

modal/custom.vue

:::

### 函数调用

`Modal`是一个函数，调用后会直接在页面中弹出相应的模态框

:::playground

modal/function.vue

:::

### Modal Props

| 属性                      | 描述                     | 类型          | 可选值           | 默认     |
| ------------------------- | ------------------------ | ------------- | ---------------- | -------- |
| **v-model:visible**       | 显示与隐藏               | `boolean`     | `'true','false'` | `false`  |
| **title**                 | 标题                     | `string`      | `-`              | `-`      |
| **width**                 | 对话框宽度               | `string`      | `-`              | `400px`  |
| **cancel**                | 取消按钮的文字           | `string`      | `-`              | `cancel` |
| **done**                  | 确定按钮的文字           | `string`      | `-`              | `done`   |
| **teleport**              | 指定对话框挂载的节点     | `HTMLElement` | `-`              | `body`   |
| **disable-overlay-click** | 点击背景层时不关闭对话框 | `boolean`     | `'true','false'` | `false`  |

### Modal Options

| 属性        | 描述             | 类型       | 可选值 | 默认     |
| ----------- | ---------------- | ---------- | ------ | -------- |
| **title**   | 标题             | `string`   | `-`    | `-`      |
| **width**   | 对话框宽度       | `string`   | `-`    | `400px`  |
| **cancel**  | 取消按钮的文字   | `string`   | `-`    | `cancel` |
| **done**    | 确定按钮的文字   | `string`   | `-`    | `done`   |
| **content** | 模态框文本内容   | `string`   | `-`    | `-`      |
| **close**   | 模态框的取消事件 | `()=>void` | `-`    | `-`      |
| **confirm** | 模态框的确认事件 | `()=>void` | `-`    | `-`      |

### Modal Events

| 事件        | 描述             | 类型       |
| ----------- | ---------------- | ---------- |
| **cancel**  | 模态框的取消事件 | `()=>void` |
| **confirm** | 模态框的确认事件 | `()=>void` |

### Modal Slots

<fe-card>
  Modal组件默认提供了<fe-code>title,action</fe-code>插槽。启用时<fe-code>title,cancel,done</fe-code>
  便会失效。
</fe-card>
