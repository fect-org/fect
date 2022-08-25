<template>
  <layout-header />
  <div class="layout">
    <router-view />
    <search />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Search } from './components/search'
import { Header } from './components/header'
// import { ErrorCapture } from './components/not-found'

export default defineComponent({
  components: { Search, ['layout-header']: Header },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.layout {
  margin: 0 auto;
  max-width: var(--fect-page-width);
  margin-top: var(--nav-height);
  min-height: calc(100vh - var(--nav-height));
  box-sizing: border-box;
  padding: 0 var(--fect-gap) calc(var(--fect-gap) * 2);
}
</style>
