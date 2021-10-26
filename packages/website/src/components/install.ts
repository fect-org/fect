import { App } from 'vue'

import Playground from './Playground/index.vue'

const components = [Playground]

const install = (vue: App) => {
  components.map((component) => {
    vue.component(component.name, component)
  })
  return
}
export { install as PageComponents }
