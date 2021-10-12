<template>
  <div
    class="fect-doc__tab-mobile"
    :style="{ boxShadow: ` 0 2px 5px 0 ${theme}` }"
  >
    <div class="fect-doc__tab-icons" @click="tapHandler">
      <navigation size="22" color="var(--accents-7)" />
    </div>
    <span>@FECT-UI/VUE</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { READONLY_DOCS_LAYOUT_KEY, LayoutProvide } from '../Layout/type'
export default defineComponent({
  emits: ['click'],
  setup(props, { emit }) {
    const DarkShadow = 'rgba(255,255,255, 0.22)'
    const LightShadow = 'rgba(0, 0, 0, 0.12)'

    const { context } = useProvider<LayoutProvide>(READONLY_DOCS_LAYOUT_KEY)

    const tapHandler = () => emit('click')

    const theme = computed(() => {
      const { theme } = context!
      if (theme.value === 'light') return LightShadow
      return DarkShadow
    })
    return {
      theme,
      tapHandler,
    }
  },
})
</script>

<style lang="less" scoped>
@breakpoint: 650px;
.fect-doc__tab-mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: none;
  width: 100vw;
  height: 3.9rem;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 0.8rem;
  background-color: var(--primary-background);
  transition: height 0.2s ease-in-out;
  // box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.12);
}
@media only screen and (max-width: @breakpoint) {
  .fect-doc__tab-icons {
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fect-doc__tab-mobile {
    display: flex;
    span {
      font-size: 12px;
      color: var(--accents-7);
      margin-right: 2.1rem;
    }
  }
}
</style>
