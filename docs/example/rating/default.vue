<template>
  <div>
    <fe-rating v-model="val" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-rating-default',
  setup() {
    const val = ref(0)

    return { val }
  },
}
</script>
