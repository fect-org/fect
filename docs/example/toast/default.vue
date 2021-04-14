<template>
  <div>
    <fect-button @click="handlerClick">Toast</fect-button>
  </div>
</template>

<script>
// import FectToast from '../../../packages/Toast/serve'
import { getCurrentInstance } from 'vue'
export default {
  name: 'ex-toast-default',
  setup() {
    const { proxy } = getCurrentInstance()
    const handlerClick = () => {
      // FectToast({
      //   text: 'I am Test MessageA!',
      //   type: 'success',
      //   duration: 2500,
      // })
      // console.log(JSON.stringify(proxy.$toast.success()))
      proxy.$toast({ text: 'I am test Message' })

      // proxy.$toast({ text: 'I am Test Message!', type: 'success' })
      // proxy.$toast.FectToast({ text: 'I am Test MessageA!', type: 'default' })
      // FectToast.warning({ text: 'hahah' })
      // FectToast.error({ text: 'hahahaTest', type: 'time' })
    }
    return {
      handlerClick,
    }
  },
}
</script>
