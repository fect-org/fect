<template>
  <div>
    <fe-input-number v-model="value" :min="1" :max="11" size="mini" strictly />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExInputNumberStrictly',
  setup() {
    const value = ref(1)

    return {
      value
    }
  }
}
</script>
