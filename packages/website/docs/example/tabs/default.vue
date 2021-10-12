<template>
  <div>
    <fe-tabs v-model:active="active">
      <fe-tab title="标签一">标签一</fe-tab>
      <fe-tab title="标签二">标签二</fe-tab>
    </fe-tabs>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-tabs-default',
  setup() {
    const active = ref(0)
    return {
      active,
    }
  },
}
</script>
