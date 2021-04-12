import { createApp } from 'vue'

const mountComponent = (RootComponent) => {
  const app = createApp(RootComponent)
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  return {
    instance: app.mount(mountNode),
    unmount() {
      app.unmount(mountNode)
      document.body.removeChild(mountNode)
    },
  }
}

export { mountComponent }
