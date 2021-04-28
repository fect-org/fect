<template>
  <div>
    <fe-tabs v-model:active="active" hideDivider>
      <fe-tab title="HTML"
        >HTML
        是我们用来构造网站内容的不同部分并定义它们的意义或目的的语言</fe-tab
      >
      <fe-tab title="JS">JS可以让我们的网站具有灵魂</fe-tab>
    </fe-tabs>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-tabs-divider',
  setup() {
    const active = ref(0)

    return {
      active,
    }
  },
}
</script>
