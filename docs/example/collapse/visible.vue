<template>
  <div>
    <fe-collapse
      title="HTML"
      subtitle="HyperText Markup Language"
      subTag="code"
      v-model:visible="show"
    >
      HTML（超文本标记语言——HyperText Markup Language）是构成 Web
      世界的一砖一瓦。 它定义了网页内容的含义和结构。除 HTML
      以外的其它技术则通常用来描述一个网页的表现与展示效果（如
      CSS），或功能与行为（如 JavaScript）。
    </fe-collapse>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-collapse-visible',
  setup() {
    const show = ref(true)
    return {
      show,
    }
  },
}
</script>
