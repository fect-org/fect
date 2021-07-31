<template>
  <div>
    <fe-rating v-model="val" :icon="setIcon()" locked @change="handleChange" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-rating-custom',
  setup() {
    const val = ref(3)
    const setIcon = () => <github />
    return { val, setIcon }
  },
}
</script>
