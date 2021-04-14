<template>
  <fect-row>
    <fect-col class="flex-able">
      <div>
        <fect-button @click="handlerClick('default')">Show</fect-button>
        <fect-spacer />
        <fect-button @click="handlerClick('success')" type="success"
          >Show</fect-button
        >
        <fect-spacer />
        <fect-button @click="handlerClick('warning')" type="warning"
          >Show</fect-button
        >
        <fect-spacer />
        <fect-button @click="handlerClick('error')" type="error"
          >Show</fect-button
        >
      </div>
    </fect-col>
  </fect-row>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'ex-toast-status',
  setup() {
    const { proxy } = getCurrentInstance()
    const handlerClick = (type) => {
      proxy.$toast({
        type,
        text: 'It support different status',
        duration: '4000',
      })
    }
    return {
      handlerClick,
    }
  },
}
</script>

<style scoped>
.flex-able {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
