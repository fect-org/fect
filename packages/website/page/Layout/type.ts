import { Ref } from 'vue'
export const READONLY_DOCS_LAYOUT_KEY = 'layoutKey'

export type LayoutProvide = {
  mobileTabClickHandler: () => void
  changeThemeHandler: (val: string) => void
  theme: Ref<string | null>
}
