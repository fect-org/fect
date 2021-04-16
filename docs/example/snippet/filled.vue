<template>
  <div v-for="(ex, idx) in types" :key="idx">
    <fect-snippet
      text="yarn add @fect-ui/vue"
      fill
      :type="ex"
      width="300px"
      :toastType="ex"
    />
    <fect-spacer />
  </div>
</template>

<script>
export default {
  name: 'ex-snippet-filled',
  setup() {
    return {
      types: ['default', 'success', 'warning', 'error'],
    }
  },
}
</script>
