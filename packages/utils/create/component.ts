/**
 *create a baise component by composition Api defineComponent and install
 */

import { App, defineComponent, ComponentOptionsWithObjectProps } from 'vue'
import { camelize } from '../format/string'

const createComponent = (name: string) => {
  return function(component: ComponentOptionsWithObjectProps) {
    component.name = name
    component.install = (vue: App) =>
      vue.component(camelize(`-${name}`), component)
    return defineComponent(component)
  } as typeof defineComponent
}

export { createComponent }
