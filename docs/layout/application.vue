<template>
  <layout-header />
  <div class="layout">
    <main>
      <router-view />
      <!-- <router-view /> -->
    </main>
    <search />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Search } from './components/search'
import { Header } from './components/header'

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
}

.layout main {
  height: 100%;
  padding: 0 var(--fect-gap) calc(var(--fect-gap) * 2);
}
</style>
