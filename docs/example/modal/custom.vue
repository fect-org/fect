<template>
  <div>
    <fe-button @click="handlerClick">Button</fe-button>
    <fe-modal
      v-model:visible="show"
      width="450px"
      cancel="放弃使用"
      done="明白了"
    >
      <template #title>
        <div style="text-align: center;font-size:20px;margin-top:30px;">
          我的最爱
        </div>
      </template>
      这就是自定义!
      <template #action> </template>
    </fe-modal>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-modal-custom',
  setup() {
    const show = ref(false)
    const handlerClick = () => (show.value = true)
    return {
      show,
      handlerClick,
    }
  },
}
</script>
