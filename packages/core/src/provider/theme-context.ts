import { provide, inject, ref } from 'vue'
import { Themes } from '../themes'
import type { InjectionKey } from 'vue'
import type { AllThemesConfigs } from './interface'

const INTERNAL_THEME_KEY: InjectionKey<AllThemesConfigs> = Symbol('ThemeContextkey')

export function createThemeContext(themes: AllThemesConfigs) {
  provide(INTERNAL_THEME_KEY, themes)
}

export function useTheme() {
  return inject(INTERNAL_THEME_KEY, {
    themes: ref(Themes.getPresets()),
    theme: ref(Themes.getPresetStaticTheme())
  })
}
