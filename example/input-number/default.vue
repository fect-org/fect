<template>
  <div>
    <fe-input-number v-model="value" :min="1" :max="11" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExInputNumberDefault',
  setup() {
    const value = ref(1)

    return {
      value
    }
  }
}
</script>
