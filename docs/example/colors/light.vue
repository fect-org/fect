<template>
  <fe-row class="color-ctx">
    <fe-col
      v-for="(color, idx) in colors"
      :key="color + idx"
      class="color-item"
      :style="style(color, idx)"
    >
      <h4>{{ color.name }}</h4>
      <span>{{ color.value }}</span>
      <span>{{ colorValue(color.value) }}</span>
    </fe-col>
  </fe-row>
</template>

<script>
import { reactive } from 'vue'
import { getCssValue } from './colors'
export default {
  name: 'ex-colors-light',
  setup() {
    const colors = reactive([
      { name: 'Purple', value: 'var(--highlight-purple)' },
      { name: 'Magenta', value: 'var(--highlight-magenta)' },
      { name: 'Pink', value: 'var(--highlight-pink)' },
      { name: 'Yellow', value: 'var(--hightlight-yellow)' },
      { name: 'Cyan', value: 'var(--hightlight-cyan)' },
    ])

    const colorValue = (val) => getCssValue(val)
    const style = (color, idx) => {
      const Style = {
        backgroundColor: color.value,
        color:
          idx > 3 ? 'var(--primary-foreground)' : ' var(--primary-background)',
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
