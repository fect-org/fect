const themes = ['light-theme', 'dark-theme']

const setTheme = (theme: string) => {
  if (typeof document === 'undefined') return
  const root = document.querySelector('html')!
  root.classList.remove(...themes)
  root.setAttribute('class', theme)
}

const setDarkTheme = () => setTheme('dark-theme')

const setLightTheme = () => setTheme('light-theme')

export { setDarkTheme, setLightTheme }
