import { Ref } from 'vue'

export type NavBar = 'home' | 'components' | 'guide'

export interface WebsiteContext {
  mobile: Ref<boolean>
  currentLang: Ref<'zh-cn' | 'en-us'>
  currentNav: Ref<NavBar>
  navLink: Ref<NavLink | string>
  updateCurrentNav: (nav: NavBar) => void
  updateCurrentLang: () => void
  updateCurrentNavIdx: (val: number | null) => void
}

export interface NavLink {
  path: string
}
