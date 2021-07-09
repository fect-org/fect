import { createApp, Component } from 'vue'

const initMountArea = (name: string) => {
  const area = document.querySelector(`.${name}`)
  if (area) return area
  const _div = document.createElement('div')
  _div.classList.add(name)
  document.body.appendChild(_div)
  return _div
}

const mountComponent = (RootComponent: Component) => {
  const app = createApp(RootComponent)
  const root = document.createElement('div')
  document.body.appendChild(root)
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    },
    mountNode: root,
  }
}

export { initMountArea, mountComponent }
