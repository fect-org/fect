<template>
  <div>
    <fe-pagination v-model="initialPage" count="10">
      <template #prev>
        <arrowLeftCircle />
      </template>
      <template #next>
        <arrowRightCircle />
      </template>
    </fe-pagination>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-pagination-custom',
  setup() {
    const initialPage = ref(1)
    return { initialPage }
  }
}
</script>
