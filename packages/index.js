import Button from './Button'
import Spacer from './Spacer'
import Avatar from './Avatar'
import AvatarGroup from './Avatar/avatar.group'
import Card from './Card'
import Dot from './Dot'
import Link from './Link'
import Tac from './Tac'

import { camelize } from './utils/format/string'
const components = [Button, Spacer, Avatar, AvatarGroup, Card, Dot, Link, Tac]
const install = (vue) => {
  if (install.installed) return
  components.map((component) => {
    vue.component(camelize(`-${component.name}`), component)
  })
}

export default { install }
