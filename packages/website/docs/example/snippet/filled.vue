<template>
  <div v-for="(ex, idx) in types" :key="idx">
    <fe-snippet
      text="yarn add @fe-ui/vue"
      fill
      :type="ex"
      width="300px"
      :toastType="ex"
    />
    <fe-spacer />
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
