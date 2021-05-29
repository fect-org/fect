<template>
  <div>
    <fe-select placeholder="placeholder" v-model="val" clearable>
      <fe-option label="Vue" value="0"></fe-option>
      <fe-option label="React" value="1"></fe-option>
      <fe-option label="Angular" value="2"></fe-option>
    </fe-select>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ex-select-default',
  setup() {
    const val = ref('1')
    return { val }
  },
}
</script>
