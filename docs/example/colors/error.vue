<template>
  <fe-row class="color-ctx">
    <fe-col
      v-for="(color, idx) in colors"
      :key="color + idx"
      class="color-item"
      :style="style(color, idx)"
    >
      <h4>{{ color.name }}</h4>
      <span @click="handleCopy(color.value)">{{ color.value }}</span>
      <span @click="handleCopy(color.value)">{{
        colorValue(color.value)
      }}</span>
    </fe-col>
  </fe-row>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'
import { getCssValue } from './colors'
import { useClipboard } from '../../../packages/utils/useClipboard'
export default {
  name: 'ex-colors-error',
  setup() {
    const colors = reactive([
      { name: 'Light', value: 'var(--error-light)' },
      { name: 'Default', value: 'var(--error-default)' },
      { name: 'Dark', value: 'var(--error-dark)' },
    ])

    const { copyText } = useClipboard()

    const { proxy } = getCurrentInstance()

    const colorValue = (val) => getCssValue(val)
    const style = (color, idx) => {
      const Style = {
        backgroundColor: color.value,
        color: ' var(--primary-background)',
      }
      return Style
    }

    const handleCopy = (val) => {
      proxy.$toast({ text: `Copied:${val}` })
      copyText(val)
    }
    return {
      colors,
      colorValue,
      style,
      handleCopy,
    }
  },
}
</script>

<style scoped>
@import url('./mixins.css');
</style>
