<template>
  <div>
    <fect-button @click="handlerClick">Toast</fect-button>
  </div>
</template>

<script>
import FectToast from '../../../packages/Toast/serve'
export default {
  name: 'ex-toast-default',
  setup() {
    const handlerClick = () => {
      FectToast({ text: 'I am Test MessageA!', type: 'success' })
      // FectToast({ text: 'I am Test MessageA!', type: 'warning' })
      // FectToast({ text: 'I am Test MessageA!', type: 'default' })
    }
    return {
      handlerClick,
    }
  },
}
</script>
