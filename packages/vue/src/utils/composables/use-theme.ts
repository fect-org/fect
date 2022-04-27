/**
 * Control fect thme System.
 * After Ver 1.1.0  can work wtih ssr.
 * In ver 1.1.0-1.5.0-rc.1, useTheme has own instance. So when you use it in different component. you can get differnt ref theme.
 * It's unreasonable. So we change useTheme behavior after ver 1.5.0-rc.1
 * Author: kanno
 */

import { watch, onMounted, ref, readonly } from 'vue'
import type { Theme } from './interface'

const DARK_THEME_QUERY = '(prefers-color-scheme: dark)'
const LIGHT_THEME_QUERY = '(prefers-color-scheme: light)'

const theme = ref<Theme>()

export const THEMES: Record<'LIGHT' | 'DARK', Theme> = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme'
}

const THEME_STORAGE_KEY = 'theme'

export const useTheme = () => {
  const themes = [THEMES.LIGHT, THEMES.DARK]

  const getClientTheme = () => {
    const storageTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (storageTheme) return storageTheme === THEMES.DARK ? THEMES.DARK : THEMES.LIGHT
    if (window.matchMedia(DARK_THEME_QUERY).matches) return THEMES.DARK
    if (window.matchMedia(LIGHT_THEME_QUERY).matches) return THEMES.LIGHT
    return THEMES.LIGHT
  }

  const set = (newTheme: Theme) => {
    if (themes.includes(newTheme) && newTheme !== theme.value) {
      theme.value = newTheme
    }
  }

  const themeChange = () => {
    const nextTheme = theme.value === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    set(nextTheme)
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.localStorage) return
    const theme = getClientTheme()
    set(theme)
  })

  watch(theme, (cur) => {
    if (typeof window === 'undefined' || !window.localStorage) return
    if (!cur) return
    localStorage.setItem('theme', cur)
    const root = document.querySelector('html') as HTMLElement
    root.setAttribute('class', cur)
  })

  return {
    themeChange,
    theme: readonly(theme)
  }
}
