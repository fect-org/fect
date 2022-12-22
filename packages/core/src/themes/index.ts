import { lightThemes } from './presets/default'
import { darkThemes } from './presets/dark'
import { UIThemes } from './presets/interface'

function getPresets(): Array<UIThemes> {
  return [lightThemes, darkThemes]
}

function getPresetStaticTheme() {
  return lightThemes
}

export const Themes = {
  getPresets,
  getPresetStaticTheme
}

export * from './presets/interface'
