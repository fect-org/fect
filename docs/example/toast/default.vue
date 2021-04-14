<template>
  <div>
    <fect-button @click="handlerClick">Toast</fect-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'ex-toast-default',
  setup() {
    const { proxy } = getCurrentInstance()
    const handlerClick = () => proxy.$toast({ text: 'I am test Message' })
    return {
      handlerClick,
    }
  },
}
</script>
