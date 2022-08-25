---
title: Theme
name: Theme
group: CUSTOMIZATION
index: 0
---

`Fect` preset two themes.`light` and `dark`. You can define your css variable by your self. Don't know css variable? Here is a [document about css variable](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### Switch Preset Theme

`Fect` provide a internal hook `use-theme`.

<fe-code block name="src/app.vue">

```html
<template>
  <div @click="themeChange">Action</div>
</template>

<script>
  import { useTheme } from '@fect-ui/vue'
  export default {
    setup() {
      const { theme, themeChange } = useTheme()
      return {
        theme,
        themeChange
      }
    }
  }
</script>
```

<fe-code/>
