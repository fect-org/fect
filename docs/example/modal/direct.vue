<template>
  <div>
    <fe-button @click="handlerClick">Button</fe-button>
  </div>
</template>

<script>
import { getCurrentInstance, ref, watchEffect } from 'vue'
export default {
  name: 'ex-modal-direct',
  setup() {
    const { proxy } = getCurrentInstance()
    const show = ref(true)
    const handlerClick = () =>
      proxy.$modal({ visible: show.value, title: 'Test' })
    watchEffect(() => {
      console.log(show.value)
    })
    return {
      handlerClick,
    }
  },
}
</script>
