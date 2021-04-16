<template>
  <div v-for="(ex, idx) in types" :key="idx">
    <fect-snippet text="yarn add @fect-ui/vue" :type="ex" width="300px" />
    <fect-spacer />
  </div>
</template>

<script>
export default {
  name: 'ex-snippet-type',
  setup() {
    return {
      types: ['default', 'success', 'warning', 'error'],
    }
  },
}
</script>
