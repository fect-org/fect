import Attributes from './Attributes'
import AttributesTitle from './Attributes/attributes.title'

const components = [Attributes, AttributesTitle]

const install = (vue) => {
  if (!install.installed) {
    components.map((component) => {
      vue.component(component.name, component)
    })
  }
  return
}
export { install as PageComponents }
