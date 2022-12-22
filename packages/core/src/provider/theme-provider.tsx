import { computed, defineComponent, watchEffect } from 'vue'
import { isArray, noop, len } from '@fect-ui/shared'
import { useState } from '@fect-ui/vue-hooks'
import { Themes } from '../themes'
import { createName } from '../utils'
import type { PropType } from 'vue'
import type { UIThemes } from '../themes'
import { createThemeContext } from './theme-context'

const name = createName('ThemeProvider')

export default defineComponent({
  name,
  props: {
    themes: {
      type: Array as PropType<Array<UIThemes>>,
      default: noop
    },
    themeType: {
      type: String
    }
  },
  setup(props, { slots }) {
    const [allThemes, setAllThems] = useState<Array<UIThemes>>([])

    const currentTheme = computed(() => {
      const theme = allThemes.value.find((theme) => theme.type === props.themeType)
      if (theme) return theme
      return Themes.getPresetStaticTheme()
    })

    watchEffect(() => {
      if (!isArray(props.themes) && !len(props.themes)) return
      setAllThems((pre) => {
        return [...pre, ...props.themes]
      })
    })

    createThemeContext({ themes: allThemes, theme: currentTheme })

    return () => <>{slots.default?.()}</>
  }
})
