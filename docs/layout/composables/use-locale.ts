import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'

const DEFAULT_LOCALE = 'zh-cn'
const DEFAULT_TAB = ''

export const useLocale = () => {
  const route = useRoute()

  const [locale, setLocale] = useState(DEFAULT_LOCALE)
  const [tabbar, setTabbar] = useState(DEFAULT_TAB)

  watchEffect(() => {
    const pathname = route.path
    const names = pathname.split('/').filter((v) => !!v)
    const currentLocale = names[0] || DEFAULT_LOCALE
    const currentTabber = names[1] || DEFAULT_TAB
    if (currentLocale !== locale.value) {
      setLocale(currentLocale)
    }
    if (currentTabber !== tabbar.value) {
      setTabbar(currentTabber)
    }
  })

  return { locale, tabbar }
}
