import type { Ref, DeepReadonly } from 'vue'
import type { UIThemes } from '../themes'

export interface AllThemesConfigs {
  themes: DeepReadonly<Ref<Array<UIThemes>>>
  theme: DeepReadonly<Ref<UIThemes>>
}
