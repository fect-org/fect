<template>
  <fe-theme-provide :vars="cssVars">
    <fe-badge>Example</fe-badge>
    <fe-spacer />
    <fe-tag text="Example" />
    <fe-spacer />
    <fe-button size="mini" auto :loading="load" @click="setThemeHandler">Theme Change</fe-button>
  </fe-theme-provide>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ExThemeProvideDefault',
  setup() {
    const cssVars = ref(null)
    const load = ref(false)

    const otherThemes = {
      badgeDefaultBgColor: '#0070f3',
      tagDefaultColor: '#0070f3'
    }

    const setThemeHandler = () => {
      load.value = !load.value
      window.setTimeout(() => {
        cssVars.value = cssVars.value ? null : otherThemes
        load.value = !load.value
      }, 2000)
    }

    return {
      cssVars,
      load,
      setThemeHandler
    }
  }
}
</script>
