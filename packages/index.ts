
import { App } from 'vue';

import './utils/styles/index.css';
import Avatar from './Avatar';
import AvatarGroup from './AvatarGroup';
import Badge from './Badge';
import BadgeAnchor from './BadgeAnchor';
import Breadcrumbs from './Breadcrumbs';
import BreadcrumbsItem from './BreadcrumbsItem';
import Button from './Button';
import Capacity from './Capacity';
import Card from './Card';
import CheckBox from './CheckBox';
import CheckboxGroup from './CheckboxGroup';
import Code from './Code';
import Col from './Col';
import Dot from './Dot';
import Image from './Image';
import Input from './Input';
import Link from './Link';
import Loading from './Loading';
import Modal from './Modal';
import Pagination from './Pagination';
import Progress from './Progress';
import Radio from './Radio';
import RadioGroup from './RadioGroup';
import Row from './Row';
import Select from './Select';
import SelectOption from './SelectOption';
import Skeleton from './Skeleton';
import SkeletonItem from './SkeletonItem';
import Snippet from './Snippet';
import Spacer from './Spacer';
import Switch from './Switch';
import Tab from './Tab';
import Tabs from './Tabs';
import Tag from './Tag';
import Toast from './Toast';
const components = [Avatar,AvatarGroup,Badge,BadgeAnchor,Breadcrumbs,BreadcrumbsItem,Button,Capacity,Card,CheckBox,CheckboxGroup,Code,Col,Dot,Image,Input,Link,Loading,Modal,Pagination,Progress,Radio,RadioGroup,Row,Select,SelectOption,Skeleton,SkeletonItem,Snippet,Spacer,Switch,Tab,Tabs,Tag,Toast];
const install = (app:App)=>{
  components.forEach((c:any) => {
    if (c.install) {
      app.use(c);
    } else if (c.name) {
      app.component(c.name, c);
    }
  });
};

export { install };

export default { install }

export { Avatar,AvatarGroup,Badge,BadgeAnchor,Breadcrumbs,BreadcrumbsItem,Button,Capacity,Card,CheckBox,CheckboxGroup,Code,Col,Dot,Image,Input,Link,Loading,Modal,Pagination,Progress,Radio,RadioGroup,Row,Select,SelectOption,Skeleton,SkeletonItem,Snippet,Spacer,Switch,Tab,Tabs,Tag,Toast };
