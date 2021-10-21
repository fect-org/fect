# Skeleton / 骨架屏

在需要等待加载内容的位置设置一个骨架屏

<playground
title="默认的"
desc="基础的骨架效果"
name="ex-skeleton-default"
/>

<playground
title="动画效果"
desc="关闭效果"
name="ex-skeleton-animate"
/>

<playground
title="Loading 状态"
desc="当 Loading 结束之后，我们往往需要显示真实的 UI，可以通过 loading 的值来控制是否显示真实的 DOM。然后通过插槽来设置当 loading 结束之后需要展示的 UI。"
name="ex-skeleton-loading"
/>

<playground
title="渲染多条数据"
desc="大多时候, 骨架屏都被用来渲染列表, 当我们需要在从服务器获取数据的时候来渲染一个假的 UI。"
name="ex-skeleton-more"
/>

<fe-attributes>
<fe-attributes-title title="Skeleton Props" />

| 属性          | 描述                                       | 类型                                        | 可选值             | 默认      |
| ------------- | ------------------------------------------ | ------------------------------------------- | ------------------ | --------- |
| **loading**   | 控制是否显示真实的 `DOM`                   | `boolean`                                   | `'true','false'`   | `false`   |
| **rows**      | 骨架屏段落数量                             | `number`                                    | -                  | `0`       |
| **animated**  | 是否启用骨架屏动画                         | `boolean`                                   | `'true','false'`   | `false`   |
| **rowsWidth** | 段落占位图宽度，可传数组来设置每一行的宽度 | `number` , `string` , `string[]`,`number[]` | `100%`             | `initial` |
| ...           | 原生属性                                   | `HTMLAttributes`                            | `'class','id',...` | `-`       |

</fe-attributes>

<fe-attributes>

<fe-attributes-title title="SkeletonItem Props" />

| 属性         | 描述                 | 类型                            | 可选值                          | 默认   |
| ------------ | -------------------- | ------------------------------- | ------------------------------- | ------ |
| **variable** | 显示的占位元素的样式 | [VariableTypes](#variabletypes) | [VariableTypes](#variabletypes) | `text` |
| ...          | 原生属性             | `HTMLAttributes`                | `'class','id',...`              | `-`    |

</fe-attributes>

<fe-attributes>
<fe-attributes-title title="VariableTypes" />

| 类型              | 可选值                                                               |
| ----------------- | -------------------------------------------------------------------- |
| **VariableTypes** | `'p', 'text', 'h1', 'h3','rect','circle','image','button','caption'` |

</fe-attributes>
