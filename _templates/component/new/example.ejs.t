---
to: docs/example/<%=h.changeCase.lcFirst(name) %>/default.vue
---

<template>
  <div>
    <fe-<%=h.changeCase.lcFirst(name) %>>1</fe-<%=h.changeCase.lcFirst(name) %>>
  </div>
</template>

<script>
export default {
  name: 'ex-<%=h.changeCase.lcFirst(name) %>-default',
}
</script>
