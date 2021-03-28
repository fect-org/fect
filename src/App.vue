<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import { Layout } from '../pages/index'
import { ref } from 'vue'
export default {
  components: {
    Layout,
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
