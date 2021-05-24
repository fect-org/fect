<template>
  <div>
    <!--  v-model="val" -->
    <fe-select placeholder="placeholder">
      <fe-option>123</fe-option>
      <fe-option>456</fe-option>
    </fe-select>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-select-default',
  setup() {
    const val = ref(1)
    return { val }
  },
}
</script>
