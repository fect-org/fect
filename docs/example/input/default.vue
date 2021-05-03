<template>
  <div>
    <fe-input placeholder="一个基础的示例" v-model="value" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-input-default',
  setup() {
    const value = ref('')

    return {
      value,
    }
  },
}
</script>
