<template>
  <div class="playground">
    <div class="exhibition">
      <component :is="component" />
    </div>
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
  width: 100%;
  border: 1px solid var(--fect-border);
  border-radius: var(--fect-radius);
}

.exhibition {
  width: 100%;
  padding: var(--fect-gap);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  > div {
    width: 100%;
    background-color: transparent;
  }
}
</style>
