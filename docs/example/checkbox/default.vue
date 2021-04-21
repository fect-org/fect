<template>
  <div>
    <fe-checkbox v-model="checked">复选框</fe-checkbox>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-checkbox-default',
  setup() {
    const checked = ref(true)
    return { checked }
  },
}
</script>
