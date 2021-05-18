import Attributes from './Attributes'
import AttributesTitle from './Attributes/attributes.title'
import CodeShow from './CodeShow/'
import Logo from './Logo'
const components = [Attributes, AttributesTitle, CodeShow, Logo]

const install = (vue) => {
  if (!install.installed) {
    components.map((component) => {
      component.install(vue)
    })
  }
  return
}
export { install as PageComponents }
