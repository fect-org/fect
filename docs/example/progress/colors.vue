<template>
  <div>
    <fe-button @click="handleClick" auto>增加</fe-button>
    <fe-spacer inline />
    <fe-button @click="() => (val = 10)" auto>重置</fe-button>
    <fe-spacer :y="0.5" />
    <fe-progress :value="val" :max="100" :colors="colors" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-progress-colors',
  setup() {
    const colors = {
      20: 'red',
      40: 'blue',
      60: 'green',
      80: '#000',
      100: 'pink',
    }
    const val = ref(10)

    const handleClick = () => (val.value += 10)
    return {
      colors,
      val,
      handleClick,
    }
  },
}
</script>
