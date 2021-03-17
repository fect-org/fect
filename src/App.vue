<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import { Layout } from '../components/index'
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
