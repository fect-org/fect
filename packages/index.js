import Avatar from './Avatar'
import Button from './Button'
import Card from './Card'
import Code from './Code'
import Dot from './Dot'
import Link from './Link'
import Spacer from './Spacer'
import Switch from './Switch'
import Toast from './Toast'
import AvatarGroup from './Avatar/avatar.group'
import { camelize } from './utils/format/string'
const components = [
  Avatar,
  Button,
  Card,
  Code,
  Dot,
  Link,
  Spacer,
  Switch,
  Toast,
  AvatarGroup,
]
const install = (vue) => {
  if (install.installed) {
    return components.map((component) => {
      vue.component(camelize(`-${component.name}`), component)
    })
  }
}
export default { install }
