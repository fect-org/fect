<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import * as Component from '../_page/index'
export default {
  components: {
    ...Component,
  },
}
</script>

<style lang="less">
body::-webkit-scrollbar {
  width: 0;
}
</style>
