import Button from './Button'
import Spacer from './Spacer'
import Avatar from './Avatar'
import { camelize } from './utils/foramt/string'
const components = [Button, Spacer, Avatar]
const install = (vue) => {
  if (install.installed) return
  components.map((component) => {
    vue.component(camelize(`-${component.name}`), component)
  })
}

export default { install }
