import { createApp, Component, unref } from 'vue'
import { ElementRef } from '../../composables/interface'
import { ComponentInstance } from '../interface'

const createNode = (name: string, node = 'div') => {
  const dom = document.querySelector(`.${name}`)
  if (dom) return dom
  const elSnapshot = document.createElement(node)
  elSnapshot.classList.add(name)
  document.body.appendChild(elSnapshot)
  return elSnapshot
}

const createPortal = <T>(children: Component, container?: ElementRef) => {
  const elSnapshot = unref(container) || document.createElement('div')
  const app = createApp(children)
  document.body.appendChild(elSnapshot)
  const instance = app.mount(elSnapshot) as ComponentInstance<T>
  return {
    instance
  }
}

export { createNode, createPortal }
