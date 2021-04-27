<template>
  <div>
    <fe-tabs v-model:active="active" @change="handlerChange">
      <fe-tab title="二进制">阿巴阿巴0</fe-tab>
      <fe-tab title="八进制">阿巴阿巴1</fe-tab>
    </fe-tabs>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
  name: 'ex-tabs-default',
  setup() {
    const active = ref(0)
    // watchEffect(() => console.log(active.value))
    const handlerChange = (e) => {
      console.log(e)
    }
    return {
      active,
      handlerChange,
    }
  },
}
</script>
