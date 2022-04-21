<template>
  <div>
    <fe-input-number placeholder="一个基础的示例" v-model="value" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExInputNumberDefault',
  setup() {
    const value = ref(10)

    return {
      value
    }
  }
}
</script>
