<template>
  <div>
    <fe-rating v-model="val" locked @change="handleChange">
      <template #icon>
        <Github />
      </template>
    </fe-rating>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExRatingCustom',
  setup() {
    const val = ref(3)
    return { val }
  }
}
</script>
