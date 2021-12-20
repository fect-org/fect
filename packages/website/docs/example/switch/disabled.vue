<template>
  <div>
    <fe-switch v-model="checked" disabled />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExSwitchDisabled',
  setup() {
    const checked = ref(true)
    return {
      checked
    }
  }
}
</script>
