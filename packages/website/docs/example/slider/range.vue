<template>
  <div>
    <fe-slider :step="5" v-model="val" showMarkers :max="50" :min="20" />
    <fe-spacer />
    <fe-slider :step="0.5" :max="10" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-slider-range',
  setup() {
    return {
      val: 20,
    }
  },
}
</script>
