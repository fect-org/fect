<template>
  <div>
    <fe-select placeholder="placeholder" v-model="val">
      <fe-option label="Vue" value="0" disabled></fe-option>
      <fe-option label="React" value="1"></fe-option>
    </fe-select>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExSelectDisableOption',
  setup() {
    const val = ref(null)
    return { val }
  }
}
</script>
