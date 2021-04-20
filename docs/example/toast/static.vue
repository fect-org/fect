<template>
  <fe-row>
    <fe-col class="flex-able">
      <div>
        <fe-button @click="handlerClick('success')" type="success"
          >Show</fe-button
        >
        <fe-spacer />
        <fe-button @click="handlerClick('warning')" type="warning"
          >Show</fe-button
        >
        <fe-spacer />
        <fe-button @click="handlerClick('error')" type="error"
          >Show</fe-button
        >
      </div>
    </fe-col>
  </fe-row>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'ex-toast-static',
  setup() {
    const { proxy } = getCurrentInstance()
    const handlerClick = (type) => {
      proxy.$toast[type]({
        text: 'It support static methods call',
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
