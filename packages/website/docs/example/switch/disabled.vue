<template>
  <div>
    <fe-switch v-model="checked" disabled in />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-switch-disabled',
  setup() {
    const checked = ref(true)
    return {
      checked,
    }
  },
}
</script>
