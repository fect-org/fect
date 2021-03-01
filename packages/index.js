import Button from './Button'
import Spacer from './Spacer'
import Avatar from './Avatar'
import AvatarGroup from './Avatar/avatar.group'
import Card from './Card'
import { camelize } from './utils/format/string'
const components = [Button, Spacer, Avatar, AvatarGroup, Card]
const install = (vue) => {
  if (install.installed) return
  components.map((component) => {
    vue.component(camelize(`-${component.name}`), component)
  })
}

export default { install }
