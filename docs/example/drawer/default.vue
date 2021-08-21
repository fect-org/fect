<template>
  <div>
    <fe-button @click="show = true" auto>Button</fe-button>
    <fe-drawer v-model="show">
      <div class="drawer">
        <h2>标题</h2>
        <h5>子标题</h5>
        <div>
          一个Geek风格的UI组件库
        </div>
      </div>
    </fe-drawer>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-drawer-default',
  setup() {
    const show = ref(false)
    return { show }
  },
}
</script>

<style scoped>
h2 {
  margin: 0;
}
h5 {
  margin-top: 5px;
  font-weight: normal;
  font-size: 13px;
}
.drawer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
