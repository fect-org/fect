import { defineComponent, watchEffect, ref } from 'vue'
import { useTheme } from '../../packages/utils'
import { useProvider } from '../../packages/utils'
import './widgets.less'

const READONLY_LAYOUT_KEY = 'layoutKey'

const Widgets = defineComponent({
  setup() {
    const isDark = ref(false)
    const themeIcon = ref('moon')
    const setTheme = (theme) => localStorage.setItem('theme', theme)
    const { ctx } = useProvider(READONLY_LAYOUT_KEY)
    /**
     *while watchEffect exduce can't not found null includes
     */

    watchEffect(() => {
      const _theme = localStorage.getItem('theme')
      if (_theme) {
        isDark.value = _theme.includes('dark')
      }
      const { setLightTheme, setDarkTheme } = useTheme
      // eslint-disable-next-line no-unused-expressions
      isDark.value ? setDarkTheme() : setLightTheme()
      ctx.handlerChangeTheme(_theme)
    })

    const changeThemeHandler = () => {
      const next = localStorage.getItem('theme')
      if (next === 'light' || next === null) {
        isDark.value = true
        setTheme('dark')
        themeIcon.value = 'sun'
      } else {
        isDark.value = false
        setTheme('light')
        themeIcon.value = 'moon'
      }
    }
    return () => (
      <>
        <div className="f_doc-widgets">
          <feLink
            href="https://github.com/fay-org/fect"
            target="_blank"
            class={'f_doc-widgets_icons'}
          >
            <fect-icon icon="github" size="18" />
          </feLink>
          <span className={'f_doc-widgets_icons'} onClick={changeThemeHandler}>
            <fect-icon icon={themeIcon.value} size="18" />
          </span>
        </div>
      </>
    )
  },
})

export default Widgets
