---
title: 主题
name: Theme
group: '定制化'
index: 2
---

`Fect` 预设了 2 套主题分别为`light`和`dark`。因为是基于`css-variable`的。因此你可以在学习定义`css-variable`后自定义你喜欢的变量。

### 切换主题

`Fect` 提供了一个切换预设主题的`hook`。您只需要调用他们就可以随意切换。

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
