<template>
  <div>
    <fe-progress :value="val" :max="100" />
    <fe-spacer :y="0.5" />
    <fe-progress :value="val" :max="100" type="success" />
    <fe-spacer :y="0.5" />
    <fe-progress :value="val" :max="100" type="warning" />
    <fe-spacer :y="0.5" />
    <fe-progress :value="val" :max="100" type="error" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-progress-types',
  setup() {
    const val = ref(10)

    return {
      val,
    }
  },
}
</script>
