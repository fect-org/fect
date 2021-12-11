<template>
  <fe-grid-group wrap="nowrap" justify="flex-start" :xs="12" :gap="2" :col="5" :count="fakeData">
    <template #grid="data">
      <fe-card class="card" shadow>{{ data.name }}</fe-card>
    </template>
  </fe-grid-group>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-grid-col',
  setup() {
    const fakeData = ref([
      { name: 'XeryYue', age: 18 },
      { name: 'Kanno', age: 19 }
    ])
    return { fakeData }
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 100px;
}
</style>
