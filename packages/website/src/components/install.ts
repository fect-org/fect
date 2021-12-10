import { App } from 'vue'

import Playground from './playground/index.vue'
import AttributeTitle from './attributes/attributes-title.vue'
import Attribtes from './attributes/index.vue'

const components = [Playground, Attribtes, AttributeTitle]

const install = (vue: App) => {
  components.map((component) => {
    vue.component(component.name, component)
  })
  return
}
export { install as PageComponents }
