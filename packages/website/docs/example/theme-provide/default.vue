<template>
  <fe-theme-provide :vars="cssVars">
    <fe-badge>Example</fe-badge>
    <fe-spacer />
    <fe-button size="mini" auto @click="setThemeHandler">Theme Change</fe-button>
  </fe-theme-provide>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ExThemeProvideDefault',
  setup() {
    const cssVars = ref(null)
    const setThemeHandler = () =>
      (cssVars.value = cssVars.value
        ? null
        : {
            primaryForeground: '#0070f3'
          })

    return {
      cssVars,
      setThemeHandler
    }
  }
}
</script>
