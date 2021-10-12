<template>
  <div v-for="(ex, idx) in types" :key="idx">
    <fe-snippet text="yarn add @fe-ui/vue" width="300px" :copy="ex" />
    <fe-spacer />
  </div>
</template>

<script>
export default {
  name: 'ex-snippet-copy',
  setup() {
    return {
      types: ['default', 'silent', 'prevent'],
    }
  },
}
</script>
