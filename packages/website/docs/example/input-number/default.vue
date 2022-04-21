<template>
  <div>
    <fe-input type="number" />
    <fe-spacer />
    <fe-input-number :step="1" v-model="value" :min="1" :max="11" size="small" />
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
