<template>
  <div>
    <fe-button @click="clickHandler('top')" auto>Top</fe-button>
    <fe-spacer inline :x="0.5" />
    <fe-button @click="clickHandler('left')" auto>Left</fe-button>
    <fe-spacer inline :x="0.5" />
    <fe-button @click="clickHandler('right')" auto>Right</fe-button>
    <fe-spacer inline :x="0.5" />
    <fe-button @click="clickHandler('bottom')" auto>Bottom</fe-button>
    <fe-drawer v-model="show" :placement="placement">
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
  name: 'ex-drawer-placement',
  setup() {
    const show = ref(false)
    const placement = ref('')
    const clickHandler = (place) => {
      placement.value = place
      show.value = true
    }
    return { show, clickHandler, placement }
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
