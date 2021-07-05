<template>
  <div class="fect-doc__widgets">
    <fe-link
      href="https://github.com/fay-org/fect"
      target="_blank"
      class="fect-doc__widgets-icons"
    >
      <github size="18" />
    </fe-link>
    <span class="fect-doc__widgets-icons" @click="changeHandler">
      <sun size="18" v-show="theme === 'sun'" />
      <moon size="18" v-show="theme === 'moon'" />
    </span>
  </div>
</template>

<script lang="ts">
import { useProvider } from '@fect-ui/vue-hooks'
import { useTheme } from '../../packages/utils'
import { LayoutProvide, READONLY_DOCS_LAYOUT_KEY } from '../Layout/type'
import { computed, defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'Widgets',
  setup() {
    const isDark = ref<boolean>(false)

    const setTheme = (theme: string) => localStorage.setItem('theme', theme)

    const { context } = useProvider<LayoutProvide>(READONLY_DOCS_LAYOUT_KEY)

    watchEffect(() => {
      const _theme = localStorage.getItem('theme') as string
      if (_theme) {
        isDark.value = _theme.includes('dark')
      }
      const { setLightTheme, setDarkTheme } = useTheme
      // eslint-disable-next-line no-unused-expressions
      isDark.value ? setDarkTheme() : setLightTheme()
      context!.changeThemeHandler(_theme)
    })

    const changeHandler = () => {
      const next = localStorage.getItem('theme')
      if (next === 'light' || next === null) {
        isDark.value = true
        setTheme('dark')
        return
      }
      isDark.value = false
      setTheme('light')
    }

    const theme = computed(() => {
      if (isDark.value) {
        return 'sun'
      }
      return 'moon'
    })

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
