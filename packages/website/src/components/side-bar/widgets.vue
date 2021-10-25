<template>
  <div class="fect-doc__widgets">
    <fe-link href="https://github.com/fay-org/fect" target="_blank" class="fect-doc__widgets-icons">
      <github size="18" />
    </fe-link>
    <span class="fect-doc__widgets-icons" @click="changeHandler">
      <sun v-show="theme === 'light-theme'" size="18" />
      <moon v-show="theme === 'dark-theme'" size="18" />
    </span>
  </div>
</template>

<script lang="ts">
import { useProvider } from '@fect-ui/vue-hooks'
import { useTheme } from '@fect-ui/vue/components/utils'
import { LayoutProvide, READONLY_DOCS_LAYOUT_KEY } from '../Layout/type'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Widgets',
  setup() {
    const { theme, themeChange } = useTheme()

    const changeHandler = () => themeChange()

    return {
      theme,
      changeHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.fect-doc__widgets {
  height: 2.5rem;
  &::before {
    content: '';
    display: inline-block;
    height: 1.25rem;
    width: 0.3125rem;
    background-color: var(--accents-2);
  }
}
.fect-doc__widgets-icons {
  height: 2.5rem;
  display: inline-block !important;
  width: 2.5rem !important;
  line-height: 2.5rem !important;
  text-align: center;
}
</style>
