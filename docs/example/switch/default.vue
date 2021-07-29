<template>
  <div>
    <fe-switch v-model="checked" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-switch-default',
  setup() {
    const checked = ref(true)
    return {
      checked,
    }
  },
}
</script>
