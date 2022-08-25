<template>
  <div>
    <fe-theme-provide :vars="cssVars">
      <fe-select placeholder="placeholder" v-model="val" multiple>
        <fe-option label="Vue" value="0"></fe-option>
        <fe-option label="React" value="1"></fe-option>
        <fe-option label="Angular" value="2"></fe-option>
        <fe-option label="Svelte" value="3"></fe-option>
        <fe-option label="BootStrap" value="4"></fe-option>
      </fe-select>
    </fe-theme-provide>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExSelectMultiple',
  setup() {
    const val = ref([])
    const cssVars = {
      selectMediumWidth: '280px'
    }
    return { val, cssVars }
  }
}
</script>
