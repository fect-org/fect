# Pagination / 分页

多个页面之间的导航与鉴别

<playground
  title="默认的"
  name="ex-pagination-default"
  desc="基础的分页"
/>

<playground
  title="朴素"
  name="ex-pagination-simple"
  desc="朴素的分页器"
/>

<playground
  title="限制"
  name="ex-pagination-limit"
  desc="调整最大可展示页面数"
/>

<playground
  title="自定义的"
  name="ex-pagination-custom"
  desc="使用插槽定制按钮"
/>

<playground
  title="尺寸"
  name="ex-pagination-size"
  desc="不同大小的分页器"
/>

<attributes>
<attributes-title title="Pagination Props" />

| 属性         | 描述                     | 类型                  | 可选值                               | 默认     |
| ------------ | ------------------------ | --------------------- | ------------------------------------ | -------- |
| **v-model**  | 当前页码                 | `number`              | `-`                                  | `1`      |
| **count**    | 页码数量                 | `'Number','String'`   | `-`                                  | `1`      |
| **size**     | 分页器的大小             | `string`              | `'mini', 'small', 'medium', 'large'` | `medium` |
| **limit**    | 一次可展示分页器的最大值 | `‘Number’,'String'`   | `-`                                  | `7`      |
| **simple**   | 朴素模式                 | `Boolean`             | `'true','false'`                     | `false`  |
| **prevText** | 分页器上一页的文字       | `string`              | `-`                                  | `Prev`   |
| **nextText** | 分页器下一页的文字       | `string`              | `-`                                  | `Next`   |
| **change**   | 分页器的事件             | `(page:number)=>void` | `-`                                  | `-`      |
| ...          | 原生属性                 | `HTMLAttributes`      | `'class','id',...`                   | `-`      |

</attributes>

<attributes>

<attributes-title title="Pagination customSlots" />

<fe-card>
  Pagination组件默认提供了<fe-code>prev,next</fe-code>插槽。启用时<fe-code>prevText,nextText</fe-code>
  便会失效。
</fe-card>

</attributes>
