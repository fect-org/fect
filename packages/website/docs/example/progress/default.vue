<template>
  <div>
    <fe-progress :value="val" :max="100" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-progress-default',
  setup() {
    const val = ref(10)

    return {
      val,
    }
  },
}
</script>
