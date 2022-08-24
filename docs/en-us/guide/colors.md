---
title: Color
name: Colors
group: CUSTOMIZATION
index: 0
---

`Fect` is based on `@fect-ui/themes`. `Fect` all component style is base on `css variable`. `@fect-ui/themes` provide all `css variable` for `fect`. You can use it in your application.If you like it. All colors with be change with theme. If you want to customlize your colors, please
read[theme](/en-us/guide/theme) to get more.

<fe-code block>

```html
<template>
  <div class="message">message</div>
</template>

<script>
  import '@fect-ui/themes'
</script>

<style>
  .message {
    color: var(--accents-1);
  }
</style>
```

<fe-code />
