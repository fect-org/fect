
import { App } from 'vue';
import './utils/styles/index.css';
import Avatar from './avatar';
import AvatarGroup from './avatar-group';
import Badge from './badge';
import BadgeAnchor from './badge-anchor';
import Breadcrumbs from './breadcrumbs';
import BreadcrumbsItem from './breadcrumbs-item';
import Button from './button';
import Capacity from './capacity';
import Card from './card';
import Checkbox from './checkbox';
import CheckboxGroup from './checkbox-group';
import Code from './code';
import Col from './col';
import Dot from './dot';
import Image from './image';
import Input from './input';
import Link from './link';
import Loading from './loading';
import Modal from './modal';
import Pagination from './pagination';
import Progress from './progress';
import Radio from './radio';
import RadioGroup from './radio-group';
import Row from './row';
import Select from './select';
import SelectOption from './select-option';
import Skeleton from './skeleton';
import SkeletonItem from './skeleton-item';
import Snippet from './snippet';
import Spacer from './spacer';
import Switch from './switch';
import Tab from './tab';
import Tabs from './tabs';
import Tag from './tag';
import Toast from './toast';
const components = [Avatar,
  AvatarGroup,
  Badge,
  BadgeAnchor,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Capacity,
  Card,
  Checkbox,
  CheckboxGroup,
  Code,
  Col,
  Dot,
  Image,
  Input,
  Link,
  Loading,
  Modal,
  Pagination,
  Progress,
  Radio,
  RadioGroup,
  Row,
  Select,
  SelectOption,
  Skeleton,
  SkeletonItem,
  Snippet,
  Spacer,
  Switch,
  Tab,
  Tabs,
  Tag,
  Toast];
const install = (app:App) => {
  components.map((component:any) => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name , component)
    }
  })
};

export {
  install,
  Avatar,
  AvatarGroup,
  Badge,
  BadgeAnchor,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Capacity,
  Card,
  Checkbox,
  CheckboxGroup,
  Code,
  Col,
  Dot,
  Image,
  Input,
  Link,
  Loading,
  Modal,
  Pagination,
  Progress,
  Radio,
  RadioGroup,
  Row,
  Select,
  SelectOption,
  Skeleton,
  SkeletonItem,
  Snippet,
  Spacer,
  Switch,
  Tab,
  Tabs,
  Tag,
  Toast,
};

export default {
  install,
};

  
