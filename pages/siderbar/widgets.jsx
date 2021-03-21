import { defineComponent, watchEffect, ref } from 'vue'
import { useTheme } from '../../packages/utils'
const Widgets = defineComponent({
  setup() {
    const isDark = ref(false)
    const setTheme = (theme) => localStorage.setItem('theme', theme)

    watchEffect(() => {
      const _theme = localStorage.getItem('theme').includes('dark')
      isDark.value = _theme
      console.log(isDark.value)
      const { setLightTheme, setDarkTheme } = useTheme
      // eslint-disable-next-line no-unused-expressions
      isDark.value ? setDarkTheme() : setLightTheme()
    })

    const changeThemeHandler = () => {
      const next = localStorage.getItem('theme')
      if (next === 'light') {
        isDark.value = true
        setTheme('dark')
      } else {
        isDark.value = false
        setTheme('light')
      }
    }
    return () => (
      <>
        <div className="widgest-container">
          <FayLink href="https://github.com/fay-org/Yuki">代码仓库</FayLink>
          <span onClick={changeThemeHandler}>主题</span>
          <style jsx>{`
            .widgest-container {
              width: 100%;
              font-size: 0.9rem;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .widgest-container::before {
              content: '';
              height: 100%;
              width: 0.3rem;
              left: 50px;
              background-color: var(--accents-7);
              position: absolute;
            }
            span {
              margin-left: var(--fay-gap-quarter);
            }
          `}</style>
        </div>
      </>
    )
  },
})

export default Widgets
