import { lightThemes } from './presets/default'
import { darkThemes } from './presets/dark'
import { UIThemes } from './presets/interface'

function getPresets(): Array<UIThemes> {
  return [lightThemes, darkThemes]
}

export const THEMES = {
  getPresets
}

export * from './presets/interface'
