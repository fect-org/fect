<template>
  <div class="container doc-wrap">
    <aside class="sidebar">
      <NavBar v-if="!isMobile" />
    </aside>
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
.sidebar {
  flex-grow: 1;
  height: calc(100% - 2rem - 96px + var(--nav-bar-width));
  top: 96px;
  bottom: 2rem;
  position: fixed;
}
.inner {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin-left: var(--nav-bar-width);
  padding-top: 25px;
  padding-left: 25px;
  padding-bottom: 50px;
  box-sizing: border-box;
  max-width: calc(100% - var(--nav-bar-width));
  h2 {
    font-size: 2.25rem;
    letter-spacing: -0.02em;
    font-weight: 600;
  }
}

@media only screen and (max-width: 650px) {
  .sidebar {
    display: none;
  }
  .inner {
    width: 90vw;
    max-width: 90vw;
    padding: 0;
    margin-left: 0;
  }
}
</style>

<style lang="less">
.doc-wrap {
  display: flex;
  h3 {
    margin-top: 40px;
  }
  h4 {
    margin-top: 25px;
  }
  ol {
    padding-left: 40px;
    margin: 25px auto;
    transform: scale(0.95);
  }
}
</style>
