<template>
  <div v-for="(ex, idx) in types" :key="idx">
    <fe-snippet text="yarn add @fe-ui/vue" fill :type="ex" width="300px" :toast-type="ex" />
    <fe-spacer />
  </div>
</template>

<script>
export default {
  name: 'ExSnippetFilled',
  setup() {
    return {
      types: ['default', 'success', 'warning', 'error']
    }
  }
}
</script>
