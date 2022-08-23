<template>
  <div class="playground">
    <component :is="component" />
    <preview :code="code" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Preview from './preview.vue'
export default defineComponent({
  name: 'Playground',
  components: { Preview },
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
