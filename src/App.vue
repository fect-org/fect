<template>
  <MDXProvider>
    <router-view />
  </MDXProvider>
</template>

<script>
import { MDXProvider } from '@mdx-js/vue-loader'

export default {
  components: {
    MDXProvider,
  },
}
</script>

<style lang="less"></style>
