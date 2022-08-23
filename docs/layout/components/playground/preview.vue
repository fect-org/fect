<template>
  <div class="preview">
    <div></div>
    <div class="raw">
      <fe-code block ref="codeRef" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import Prism from 'prismjs'
export default defineComponent({
  name: 'Preview',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const codeRef = ref<HTMLElement>(null)

    const parserdCode = computed(() => Prism.highlight(decodeURIComponent(props.code), Prism.languages.html, 'html'))

    watch(
      parserdCode,
      (cur) => {
        setTimeout(() => {
          console.log(codeRef.value)
          codeRef.value.$el.children[0].innerHTML = cur
        }, 5000)
      },
      { immediate: true }
    )

    return { parserdCode, codeRef }
  }
})
</script>
<!-- 
<style lang="less" scoped>
.raw {
}
</style> -->
