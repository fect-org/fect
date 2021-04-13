import { createApp } from 'vue'

const initMountArea = (name) => {
  const area = document.querySelector(`.${name}`)
  if (area) return area
  const _div = document.createElement('div')
  _div.classList.add(name)
  document.body.appendChild(_div)
  return _div
}

const mountComponent = (RootComponent, args) => {
  const app = createApp(RootComponent, { ...args })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  return {
    instance: () => app.mount(mountNode),
    unmount(node = document.body) {
      app.unmount(mountNode)
      node.removeChild(mountNode)
    },
    mountNode,
  }
}

export { mountComponent, initMountArea }
