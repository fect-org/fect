<template>
  <div v-for="(ex, idx) in types" :key="idx">
    <fect-snippet text="yarn add @fect-ui/vue" width="300px" :copy="ex" />
    <fect-spacer />
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
