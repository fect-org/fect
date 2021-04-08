import Attributes from './Attributes'
import AttributesTitle from './Attributes/attributes.title'
import CodeShow from './CodeShow/'

const components = [Attributes, AttributesTitle, CodeShow]

const install = (vue) => {
  if (!install.installed) {
    components.map((component) => {
      vue.component(component.name, component)
    })
  }
  return
}
export { install as PageComponents }
