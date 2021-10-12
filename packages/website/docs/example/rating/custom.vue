<template>
  <div>
    <fe-rating v-model="val" :icon="icon" locked @change="handleChange" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-rating-custom',
  setup() {
    const val = ref(3)
    const icon = <github />
    return { val, icon }
  },
}
</script>
