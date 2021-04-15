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
  name: 'ex-colors-default',
  setup() {
    const colors = reactive([
      { name: 'Background', value: 'var(--primary-background)' },
      { name: 'Accent 1', value: 'var(--accents-1)' },
      { name: 'Accent 2', value: 'var(--accents-2)' },
      { name: 'Accent 3', value: 'var(--accents-3)' },
      { name: 'Accent 4', value: 'var(--accents-4)' },
      { name: 'Accent 5', value: 'var(--accents-5)' },
      { name: 'Accent 6', value: 'var(--accents-6)' },
      { name: 'Accent 7', value: 'var(--accents-7)' },
      { name: 'Accent 8', value: 'var(--accents-8)' },
      { name: 'Foreground', value: 'var(--primary-foreground)' },
    ])

    const colorValue = (val) => getCssValue(val)
    const style = (color, idx) => {
      const Style = {
        backgroundColor: color.value,
        color:
          idx > 5 ? ' var(--primary-background)' : 'var(--primary-foreground)',
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

<style scoped src="./mixins.css"></style>
