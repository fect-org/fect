<template>
  <div>
    <fe-input-number :step="0.5" v-model="value" :min="1" :max="11" size="small" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExInputNumberStep',
  setup() {
    const value = ref(1)

    return {
      value
    }
  }
}
</script>
