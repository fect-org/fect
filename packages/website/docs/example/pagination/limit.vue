<template>
  <div>
    <fe-pagination v-model="initialPage" count="10" :limit="3"></fe-pagination>
    <fe-pagination v-model="initialPage" count="10" :limit="5"></fe-pagination>
    <fe-pagination
      v-model="initialPage"
      count="10"
      :limit="8"
      prev-text="上一页"
      next-text="下一页"
    ></fe-pagination>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-pagination-limit',
  setup() {
    const initialPage = ref(1)
    return { initialPage }
  },
}
</script>
