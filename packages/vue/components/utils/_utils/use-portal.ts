import { createApp, Component, unref } from 'vue'
import { ElementRef } from './use-rect'

const createNode = (name: string) => {
  const dom = document.querySelector(`.${name}`)
  if (dom) return dom
  const elSnapshot = document.createElement('div')
  elSnapshot.classList.add(name)
  document.body.appendChild(elSnapshot)
  return elSnapshot
}

const createPortal = (children: Component, container?: ElementRef) => {
  const elSnapshot = unref(container) || document.createElement('div')
  const app = createApp(children)
  document.body.appendChild(elSnapshot)
  app.mount(elSnapshot)
}

export { createNode, createPortal }
