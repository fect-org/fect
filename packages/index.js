import Button from './Button'
const components = [Button]
const install = (vue) => {
  if (install.installed) return
  components.map((component) => vue.component(component.name, component))
}

export default { install }
