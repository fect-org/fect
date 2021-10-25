<template>
  <!-- nav-bar content -->
  <nav-bar />
  <div class="fect-doc__layout">
    <side-bar />
    <main class="fect-doc__main">
      <div class="fect-doc__article">
        <slot />
      </div>
      <!-- widget list -->
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { READONLY_DOCS_LAYOUT_KEY } from './type'
import NavBar from '../nav-bar/index.vue'
import SideBar from '../side-bar/index.vue'
export default defineComponent({
  components: { SideBar, NavBar },
  setup(props, { slots }) {
    const isScroll = ref(false)
    const theme = ref(localStorage.getItem('theme'))
    const { provider } = createProvider(READONLY_DOCS_LAYOUT_KEY)
    const changeThemeHandler = (cur: string) => (theme.value = cur)

    const isMobileScroll = computed(() => (isScroll.value ? 'isAcive' : ''))

    provider({
      changeThemeHandler,
      theme,
    })
    return {
      isMobileScroll,
    }
  },
})
</script>

<style lang="less" scoped>
@import url('./code.css');

.fect-doc {
  &__layout {
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 calc(var(--fay-gap) * 2);
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
  }
  &__main {
    display: flex;
    max-width: calc(100% - 220px);
    flex-direction: column;
    padding-left: 200px;
    padding-top: 64px;
    flex: 0 0 100%;
    padding-bottom: 150px;
  }
  &__article {
    box-sizing: border-box;
    max-width: 50rem;
  }
  @media only screen and (max-width: 650px) {
    &__layout {
      padding: 0;
      max-width: 90vw;
    }
    &__main {
      max-width: 100%;
      padding-bottom: 50px;
      padding-left: 0;
    }
  }
}
</style>
