<template>
  <layout>
    <router-view />
  </layout>
</template>

<script>
import Layout from './components/layout/index.vue'
export default {
  components: {
    Layout,
  },
}
</script>

<style lang="less">
body::-webkit-scrollbar {
  width: 0;
}
</style>
