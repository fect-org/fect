<template>
  <div>
    <fe-select placeholder="placeholder" v-model="val" size="mini">
      <fe-option label="Vue" value="0"></fe-option>
      <fe-option label="React" value="1"></fe-option>
      <fe-option label="Angular" value="2"></fe-option>
      <fe-option label="Svelte" value="3"></fe-option>
      <fe-option label="BootStrap" value="4"></fe-option>
    </fe-select>
    <fe-spacer />
    <fe-select placeholder="placeholder" v-model="val" size="small">
      <fe-option label="Vue" value="0"></fe-option>
      <fe-option label="React" value="1"></fe-option>
      <fe-option label="Angular" value="2"></fe-option>
      <fe-option label="Svelte" value="3"></fe-option>
      <fe-option label="BootStrap" value="4"></fe-option>
    </fe-select>
    <fe-spacer />
    <fe-select placeholder="placeholder" v-model="val" size="medium">
      <fe-option label="Vue" value="0"></fe-option>
      <fe-option label="React" value="1"></fe-option>
      <fe-option label="Angular" value="2"></fe-option>
      <fe-option label="Svelte" value="3"></fe-option>
      <fe-option label="BootStrap" value="4"></fe-option>
    </fe-select>
    <fe-spacer />
    <fe-select placeholder="placeholder" v-model="val" size="large">
      <fe-option label="Vue" value="0"></fe-option>
      <fe-option label="React" value="1"></fe-option>
      <fe-option label="Angular" value="2"></fe-option>
      <fe-option label="Svelte" value="3"></fe-option>
      <fe-option label="BootStrap" value="4"></fe-option>
    </fe-select>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ExSelectSize',
  setup() {
    const val = ref('0')

    return { val }
  }
}
</script>
