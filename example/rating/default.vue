<template>
  <div>
    <fe-rating v-model="val" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExRatingDefault',
  setup() {
    const val = ref(0)

    return { val }
  }
}
</script>
