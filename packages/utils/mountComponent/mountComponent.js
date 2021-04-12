import { createApp } from 'vue'

const mountComponent = (RootComponent, args) => {
  const app = createApp(RootComponent, { ...args })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  return {
    instance: () => app.mount(mountNode),
    unmount() {
      app.unmount(mountNode)
      document.body.removeChild(mountNode)
    },
  }
}

export { mountComponent }
