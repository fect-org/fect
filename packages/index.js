import Button from './Button'
import { camelize } from './utils/foramt/string'
const components = [Button]
const install = (vue) => {
  if (install.installed) return
  components.map((component) =>
    vue.component(camelize(`-${component.name}`), component),
  )
}

export default { install }
