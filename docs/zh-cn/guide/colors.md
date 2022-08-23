---
title: 色彩
name: Colors
group: '定制化'
index: 1
---

默认的色彩展示。

### 主要的

`Fect`的外部模块依赖于`@fect-ui/themes`。`fect`的所有组件是基于`css variable`进行设置的。这个包涵盖了当前`fect`所有的基础样式变量。你可以在自己的应用中随意使用这些色彩。所有的色彩都会跟随主题进行变化。想要自定义一些颜色?请阅读[主题](/zh-cn/guide/theme) 文档了解更多。

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
