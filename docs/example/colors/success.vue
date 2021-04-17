<template>
  <fect-row class="color-ctx">
    <fect-col
      v-for="(color, idx) in colors"
      :key="color + idx"
      class="color-item"
      :style="style(color, idx)"
    >
      <h4>{{ color.name }}</h4>
      <span>{{ color.value }}</span>
      <span>{{ colorValue(color.value) }}</span>
    </fect-col>
  </fect-row>
</template>

<script>
import { reactive } from 'vue'
import { getCssValue } from './colors'
export default {
  name: 'ex-colors-success',
  setup() {
    const colors = reactive([
      { name: 'Light', value: 'var(--success-light)' },
      { name: 'Default', value: 'var(--success-default)' },
      { name: 'Dark', value: 'var(--success-dark)' },
    ])

    const colorValue = (val) => getCssValue(val)
    const style = (color, idx) => {
      const Style = {
        backgroundColor: color.value,
        color: ' var(--primary-background)',
      }
      return Style
    }
    return {
      colors,
      colorValue,
      style,
    }
  },
}
</script>

<style scoped>
@import url('./mixins.css');
</style>
