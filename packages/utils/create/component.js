/**
 *create a baise component by composition Api defineComponent and install
 */

import { defineComponent } from 'vue'
import { camelize } from '../format/string'

const createComponent = (name) => {
  return function(component) {
    component.name = name
    component.install = (vue) => vue.component(camelize(`-${name}`), component)
    return defineComponent(component)
  }
}

export { createComponent }
