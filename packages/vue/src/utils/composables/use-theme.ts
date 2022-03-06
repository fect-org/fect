/**
 * provide fect-ui default theme system.
 * Version:1.1.0  can work in ssr.
 * Author: kanno
 */

import { watch, onMounted } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import type { Theme } from './interface'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>()

  const themeChange = () => {
    if (typeof window === 'undefined' || !window.localStorage) return
    setTheme((pre) => (pre === 'light-theme' ? 'dark-theme' : 'light-theme'))
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.localStorage) return

    const isDarkMode =
      matchMedia('(prefers-color-scheme)').media !== 'not all' && matchMedia('(prefers-color-scheme: dark)').matches

    const theme = (localStorage.getItem('theme') as Theme) || (isDarkMode ? 'dark-theme' : 'light-theme')
    setTheme(theme)
  })

  watch(theme, (pre) => {
    if (typeof window === 'undefined' || !window.localStorage) return
    localStorage.setItem('theme', pre)
    const root = document.querySelector('html') as HTMLElement
    root.setAttribute('class', theme.value)
  })

  return {
    themeChange,
    theme
  }
}
