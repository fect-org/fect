<template>
  <div class="playground">
    {{ decodeURIComponent(code) }}
    <component :is="component" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Playground',
  props: {
    code: {
      type: String,
      default: ''
    },
    component: String
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.playground {
}
</style>
