<template>
  <div>
    <fe-button @click="handlerClick">Toast</fe-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'ExToastDefault',
  setup() {
    const { proxy } = getCurrentInstance()

    const handlerClick = () => {
      proxy.$toast.removeAll()
      proxy.$toast({ text: 'I am test Message', placement: 'topRight', actions: 'cancel' })
    }
    return {
      handlerClick
    }
  }
}
</script>
