<template>
  <fe-collapseGroup v-model="show">
    <fe-collapse title="HTML" subtitle="HyperText Markup Language" subTag="code">
      HTML（超文本标记语言——HyperText Markup Language）是构成 Web 世界的一砖一瓦。 它定义了网页内容的含义和结构。除 HTML
      以外的其它技术则通常用来描述一个网页的表现与展示效果（如 CSS），或功能与行为（如 JavaScript）。
    </fe-collapse>
    <fe-collapse title="层叠样式表" subtitle="Cascading Style Sheets，缩写为Css" subTag="code">
      层叠样式表 (Cascading Style Sheets，缩写为 CSS），是一种 样式表 语言， 用来描述 HTML 或 XML（包括如
      SVG、MathML、XHTML 之类的 XML 分支语言）文档的呈现。 CSS
      描述了在屏幕、纸质、音频等其它媒体上的元素应该如何被渲染的问题。
    </fe-collapse>
  </fe-collapseGroup>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-collapse-accordion',
  setup() {
    const show = ref([1])
    return { show }
  }
}
</script>
