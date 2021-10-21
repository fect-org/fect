import { App } from 'vue'
import Attributes from './Attributes/index.vue'
import AttributesTitle from './Attributes/attributes-title.vue'
import Logo from './Logo/index.vue'
import Playground from './Playground/index.vue'

const components = [Attributes, AttributesTitle, Playground, Logo]

const install = (vue: App) => {
  components.map((component) => {
    vue.component(component.name, component)
  })
  return
}
export { install as PageComponents }
