import Avatar from './Avatar'
import AvatarGroup from './AvatarGroup'
import Badge from './Badge'
import BadgeAnchor from './BadgeAnchor'
import Breadcrumbs from './Breadcrumbs'
import BreadcrumbsItem from './BreadcrumbsItem'
import Button from './Button'
import Capacity from './Capacity'
import Card from './Card'
import CheckBox from './CheckBox'
import CheckBoxGroup from './CheckBoxGroup'
import Code from './Code'
import Col from './Col'
import Dot from './Dot'
import Image from './Image'
import Input from './Input'
import Link from './Link'
import Loading from './Loading'
import Modal from './Modal'
import Pagination from './Pagination'
import Radio from './Radio'
import RadioGroup from './RadioGroup'
import Row from './Row'
import Snippet from './Snippet'
import Spacer from './Spacer'
import Switch from './Switch'
import Tab from './Tab'
import Tabs from './Tabs'
import Tag from './Tag'
import Toast from './Toast'

import './utils/styles/index.css'
const components = [
  Avatar,
  AvatarGroup,
  Badge,
  BadgeAnchor,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Capacity,
  Card,
  CheckBox,
  CheckBoxGroup,
  Code,
  Col,
  Dot,
  Image,
  Input,
  Link,
  Loading,
  Modal,
  Pagination,
  Radio,
  RadioGroup,
  Row,
  Snippet,
  Spacer,
  Switch,
  Tab,
  Tabs,
  Tag,
  Toast,
]
const install = (vue) => {
  if (!install.installed) {
    components.map((component) => {
      component.install(vue)
    })
  }
  return
}
export default { install }
