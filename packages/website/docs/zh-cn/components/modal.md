# Modal / 对话框

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

<!-- <playground title="指令" name="ex-modal-direct" desc="使用指令唤醒modal" /> -->

### Modal Props

| 属性                | 描述                 | 类型          | 可选值           | 默认     |
| ------------------- | -------------------- | ------------- | ---------------- | -------- |
| **v-model:visible** | 显示与隐藏           | `boolean`     | `'true','false'` | `false`  |
| **title**           | 标题                 | `string`      | `-`              | `-`      |
| **width**           | 对话框宽度           | `string`      | `-`              | `420px`  |
| **cancel**          | 取消按钮的文字       | `string`      | `-`              | `cancel` |
| **done**            | 确定按钮的文字       | `string`      | `-`              | `done`   |
| **teleport**        | 指定对话框挂载的节点 | `HTMLElement` | `-`              | `body`   |

### Modal customSlots

<fe-card>
  Modal组件默认提供了<fe-code>title,action</fe-code>插槽。启用时<fe-code>title,cancel,done</fe-code>
  便会失效。
</fe-card>
