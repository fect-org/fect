const version = '1.6.0'

import { App } from 'vue'

import { Affix } from './affix'
import { Avatar } from './avatar'
import { AvatarGroup } from './avatar-group'
import { BackTop } from './back-top'
import { Backdrop } from './backdrop'
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
import { InputNumber } from './input-number'
import { Link } from './link'
import { Loading } from './loading'
import { Modal } from './modal'
import { Pagination } from './pagination'
import { Popover } from './popover'
import { Progress } from './progress'
import { Radio } from './radio'
import { RadioGroup } from './radio-group'
import { Rating } from './rating'
import { Select } from './select'
import { SelectOption } from './select-option'
import { Skeleton } from './skeleton'
import { SkeletonItem } from './skeleton-item'
import { Slider } from './slider'
import { Snippet } from './snippet'
import { Spacer } from './spacer'
import { Switch } from './switch'
import { Tab } from './tab'
import { Tabs } from './tabs'
import { Tag } from './tag'
import { Textarea } from './textarea'
import { ThemeProvide } from './theme-provide'
import { ThemeProvider } from './provider'
import { Toast } from './toast'
import { Tooltip } from './tooltip'
import { Upload } from './upload'
import { User } from './user'
const components = [
  Affix,
  Avatar,
  AvatarGroup,
  BackTop,
  Backdrop,
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
  InputNumber,
  Link,
  Loading,
  Modal,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Rating,
  Select,
  SelectOption,
  Skeleton,
  SkeletonItem,
  Slider,
  Snippet,
  Spacer,
  Switch,
  Tab,
  Tabs,
  Tag,
  Textarea,
  ThemeProvide,
  Toast,
  Tooltip,
  Upload,
  User,
  ThemeProvider
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

export * from './affix'
export * from './avatar'
export * from './avatar-group'
export * from './back-top'
export * from './backdrop'
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
export * from './collapse'
export * from './collapse-group'
export * from './composables'
export * from './dot'
export * from './drawer'
export * from './form'
export * from './form-item'
export * from './grid'
export * from './grid-group'
export * from './image'
export * from './image-browser'
export * from './input'
export * from './input-number'
export * from './link'
export * from './loading'
export * from './modal'
export * from './pagination'
export * from './popover'
export * from './progress'
export * from './radio'
export * from './radio-group'
export * from './rating'
export * from './select'
export * from './select-option'
export * from './skeleton'
export * from './skeleton-item'
export * from './slider'
export * from './snippet'
export * from './spacer'
export * from './switch'
export * from './tab'
export * from './tabs'
export * from './tag'
export * from './textarea'
export * from './theme-provide'
export * from './toast'
export * from './tooltip'
export * from './upload'
export * from './user'
export * from './provider'
export * from './themes'

export { install, version }

export default {
  install,
  version
}
