<template>
  <div v-for="(ex, idx) in types" :key="idx">
    <fe-snippet text="yarn add @fect-ui/vue" :type="ex" width="300px" />
    <fe-spacer />
  </div>
</template>

<script>
export default {
  name: 'ExSnippetType',
  setup() {
    return {
      types: ['default', 'success', 'warning', 'error']
    }
  }
}
</script>
