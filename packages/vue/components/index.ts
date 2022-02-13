const version = '1.3.0-rc.1'

import { App } from 'vue'

import { Avatar } from './avatar'
import { AvatarGroup } from './avatar-group'
import { BackTop } from './back-top'
import { Badge } from './badge'
import { BadgeAnchor } from './badge-anchor'
import { Breadcrumbs } from './breadcrumbs'
import { BreadcrumbsItem } from './breadcrumbs-item'
import { Button } from './button'
import { ButtonGroup } from './button-group'
import { Capacity } from './capacity'
import { Card } from './card'
import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'
import { Code } from './code'
import { Col } from './col'
import { Collapse } from './collapse'
import { CollapseGroup } from './collapse-group'
import { Dot } from './dot'
import { Drawer } from './drawer'
import { Form } from './form'
import { FormItem } from './form-item'
import { Grid } from './grid'
import { GridGroup } from './grid-group'
import { Image } from './image'
import { ImageBrowser } from './image-browser'
import { Input } from './input'
import { Link } from './link'
import { Loading } from './loading'
import { Modal } from './modal'
import { Pagination } from './pagination'
import { Popover } from './popover'
import { Progress } from './progress'
import { Radio } from './radio'
import { RadioGroup } from './radio-group'
import { Rating } from './rating'
import { Row } from './row'
import { Select } from './select'
import { SelectOption } from './select-option'
import { Skeleton } from './skeleton'
import { SkeletonItem } from './skeleton-item'
import { Slider } from './slider'
import { Snippet } from './snippet'
import { Spacer } from './spacer'
import { Spinner } from './spinner'
import { Swipe } from './swipe'
import { SwipeItem } from './swipe-item'
import { Switch } from './switch'
import { Tab } from './tab'
import { Tabs } from './tabs'
import { Tag } from './tag'
import { Teleport } from './teleport'
import { ThemeProvide } from './theme-provide'
import { Toast } from './toast'
import { Tooltip } from './tooltip'
import { User } from './user'
const components = [
  Avatar,
  AvatarGroup,
  BackTop,
  Badge,
  BadgeAnchor,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  ButtonGroup,
  Capacity,
  Card,
  Checkbox,
  CheckboxGroup,
  Code,
  Col,
  Collapse,
  CollapseGroup,
  Dot,
  Drawer,
  Form,
  FormItem,
  Grid,
  GridGroup,
  Image,
  ImageBrowser,
  Input,
  Link,
  Loading,
  Modal,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Rating,
  Row,
  Select,
  SelectOption,
  Skeleton,
  SkeletonItem,
  Slider,
  Snippet,
  Spacer,
  Spinner,
  Swipe,
  SwipeItem,
  Switch,
  Tab,
  Tabs,
  Tag,
  Teleport,
  ThemeProvide,
  Toast,
  Tooltip,
  User
]

const install = (app: App) => {
  components.map((component: any) => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

export * from './avatar'
export * from './avatar-group'
export * from './back-top'
export * from './badge'
export * from './badge-anchor'
export * from './breadcrumbs'
export * from './breadcrumbs-item'
export * from './button'
export * from './button-group'
export * from './capacity'
export * from './card'
export * from './checkbox'
export * from './checkbox-group'
export * from './code'
export * from './col'
export * from './collapse'
export * from './collapse-group'
export * from './dot'
export * from './drawer'
export * from './form'
export * from './form-item'
export * from './grid'
export * from './grid-group'
export * from './image'
export * from './image-browser'
export * from './input'
export * from './link'
export * from './loading'
export * from './modal'
export * from './pagination'
export * from './popover'
export * from './progress'
export * from './radio'
export * from './radio-group'
export * from './rating'
export * from './row'
export * from './select'
export * from './select-option'
export * from './skeleton'
export * from './skeleton-item'
export * from './slider'
export * from './snippet'
export * from './spacer'
export * from './spinner'
export * from './swipe'
export * from './swipe-item'
export * from './switch'
export * from './tab'
export * from './tabs'
export * from './tag'
export * from './teleport'
export * from './theme-provide'
export * from './toast'
export * from './tooltip'
export * from './user'
export * from './utils/composables'

export { install, version }

export default {
  install,
  version
}
