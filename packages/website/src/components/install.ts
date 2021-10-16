import { App } from 'vue'
import Attributes from './Attributes/index.vue'
import AttributesTitle from './Attributes/attributes-title.vue'
import CodeShow from './CodeShow/index.vue'
import Logo from './Logo/index.vue'
import Prism from 'vue-prism-component'

Prism.name = 'Prism'
const components = [Attributes, AttributesTitle, CodeShow, Logo, Prism]

const install = (vue: App) => {
  components.map((component) => {
    vue.component(component.name, component)
  })
  return
}
export { install as PageComponents }
