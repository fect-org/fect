<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import { Layout } from '../_page/index'
import { ref } from 'vue'
import * as Component from '../_page/index'
export default {
  components: {
    // Layout,
    ...Component,
  },
  setup() {
    const type = ref('default')
    const handlerClick = () => {
      if (type.value === 'success') return (type.value = 'defaut')
      type.value = 'success'
    }
    return {
      type,
      handlerClick,
    }
  },
}
</script>

<style lang="less">
body::-webkit-scrollbar {
  width: 0;
}
</style>
