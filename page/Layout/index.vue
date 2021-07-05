<template>
  <div class="fect-doc__layout">
    <tabbar-mobile @click="mobileTabClickHandler" />
    <aside :class="`fect-doc__siderbar ${isMobileScroll}`">
      <sider-bar />
    </aside>
    <div class="fect-side__shadow"></div>
    <main class="fect-doc__main">
      <div>
        <slot />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { READONLY_DOCS_LAYOUT_KEY } from './type'
import siderBar from '../SiderBar/index.vue'
import tabbarMobile from '../SiderBar/tabbar-mobile.vue'
export default defineComponent({
  components: { siderBar, tabbarMobile },
  setup(props, { slots }) {
    const isScroll = ref(false)
    const theme = ref(localStorage.getItem('theme'))
    const { provider } = createProvider(READONLY_DOCS_LAYOUT_KEY)
    const mobileTabClickHandler = () => (isScroll.value = !isScroll.value)
    const changeThemeHandler = (cur: string) => (theme.value = cur)

    const isMobileScroll = computed(() => (isScroll.value ? 'isAcive' : ''))

    provider({
      mobileTabClickHandler,
      changeThemeHandler,
      theme,
    })
    return {
      isMobileScroll,
      mobileTabClickHandler,
    }
  },
})
</script>

<style lang="less" scoped>
@breakpoint: 650px;
.fect-doc__layout {
  margin: 0 auto;
  max-width: var(--fay-page-width);
  padding: 0 var(--fay-gap);
  box-sizing: border-box;
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-sans);
    margin: 0 0 0.625rem 0;
    color: inherit;
  }
  h2,
  h3 {
    font-weight: 600;
  }
}
.fect-doc__siderbar {
  width: 200px;
  position: fixed;
  top: 100px;
  bottom: 2rem;
  -webkit-overflow-scrolling: touch;
  flex-shrink: 0;
  z-index: 100;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
}
.fect-side__shadow {
  width: 200px;
  margin-right: 20px;
  flex-shrink: 0;
  height: 100vh;
}
.fect-doc__main {
  display: flex;
  max-width: calc(100% - 220px);
  flex-direction: column;
  padding-left: 20px;
  padding-top: 25px;
  flex: 0 0 100%;
  padding-bottom: 150px;
}

@media only screen and (max-width: @breakpoint) {
  .fect-doc__layout {
    max-width: 100%;
    width: 100%;
    padding: 0rem 1rem;
  }
  .fect-doc__siderbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    width: 100vw;
    padding: 0;
    box-sizing: border-box;
    padding: 0 var(--fay-gap);
    padding-top: var(--fay-gap);
    height: 0;
    background-color: var(--primary-background);
    &::-webkit-scrollbar {
      width: 0;
    }
    &.isAcive {
      top: 3.7rem;
      height: calc(100vh - 3.9rem);
      transition: height 250ms ease;
      overflow: auto;
      z-index: 20;
    }
  }
  .fect-side__shadow {
    width: 0;
    margin: 0;
    display: none;
  }
  .fect-doc__main {
    margin-top: 6rem;
    width: 90vw;
    max-width: 90vw;
    padding: 0;
  }
}
</style>
