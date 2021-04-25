<template>
  <div>
    <fe-button @click="handlerClick">Button</fe-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'ex-modal-direct',
  setup() {
    const { proxy } = getCurrentInstance()
    const handlerClick = () => proxy.$modal({ visible: false, title: 'Test' })
    return {
      handlerClick,
    }
  },
}
</script>
