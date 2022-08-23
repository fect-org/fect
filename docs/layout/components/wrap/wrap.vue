<template>
  <div class="container">
    <NavBar v-if="!isMobile" />
    <div class="inner">
      <h2>{{ meta.title }}</h2>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useMedia } from '../../composables'
import { NavBar } from '../navbar'

export default defineComponent({
  components: {
    NavBar
  },
  setup() {
    //
    const route = useRoute()
    const isMobile = useMedia('650px', { match: 'down' })

    const meta = computed(() => route.meta)

    return {
      meta,
      isMobile
    }
  }
})
</script>

<style lang="less" scoped>
.inner {
  height: 100%;
  overflow-y: auto;
  margin-left: var(--nav-bar-width);
  padding-top: 25px;
  box-sizing: border-box;
  max-width: calc(100% - var(--nav-bar-width));
  h2 {
    font-size: 2.25rem;
    letter-spacing: -0.02em;
    font-weight: 600;
  }
}
</style>

<style></style>