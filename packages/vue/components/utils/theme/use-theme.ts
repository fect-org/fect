// theme provide light and dark

import { useState } from '../_utils'
import { watch } from 'vue'
export type Theme = 'light-theme' | 'dark-theme'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') || 'light-theme')

  const themeChange = () => setTheme(theme.value === 'light-theme' ? 'dark-theme' : 'light-theme')

  watch(
    theme,
    (pre) => {
      localStorage.setItem('theme', pre)
      if (typeof document === 'undefined') return
      const root = document.querySelector('html')
      root?.setAttribute('class', theme.value)
    },
    { immediate: true }
  )

  return {
    themeChange,
    theme,
  }
}
