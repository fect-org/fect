<template>
  <div>
    <fe-pagination
      v-model="initialPage"
      count="10"
      :size="ex"
      v-for="(ex, i) in sizes"
      :key="i"
    ></fe-pagination>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-pagination-size',
  setup() {
    const initialPage = ref(1)
    const sizes = ref(['mini', 'small', 'medium', 'large'])
    return { initialPage, sizes }
  },
}
</script>
