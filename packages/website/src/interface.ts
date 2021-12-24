import { Ref } from 'vue'

export type NavBar = 'components' | 'guide' | ''

export interface WebsiteContext {
  width: Ref<number>
  mobile: Ref<boolean>
  navTag: Ref<NavBar>
  currentLang: Ref<'zh-cn' | 'en-us'>
  currentNav: Ref<NavBar>
  component: Ref<string>
  navLink: Ref<NavLink | string>
  updateCurrentNav: (nav: NavBar) => void
  updateCurrentLang: () => void
  updateCurrentNavIdx: (val: number | null) => void
}

export interface NavLink {
  path: string
}
