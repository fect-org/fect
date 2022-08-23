<template>
  <div>
    <fe-select placeholder="placeholder" v-model="val" disabled>
      <fe-option label="Vue" value="0"></fe-option>
      <fe-option label="React" value="1"></fe-option>
    </fe-select>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExSelectDisabled',
  setup() {
    const val = ref(null)
    return { val }
  }
}
</script>
