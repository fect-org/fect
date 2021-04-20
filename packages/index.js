import Avatar from './Avatar';
import AvatarGroup from './AvatarGroup';
import Badge from './Badge';
import BadgeAnchor from './BadgeAnchor';
import Button from './Button';
import Capacity from './Capacity';
import Card from './Card';
import CheckBox from './CheckBox';
import Code from './Code';
import Col from './Col';
import Dot from './Dot';
import Input from './Input';
import Link from './Link';
import Loading from './Loading';
import Radio from './Radio';
import RadioGroup from './RadioGroup';
import Row from './Row';
import Snippet from './Snippet';
import Spacer from './Spacer';
import Switch from './Switch';
import Tab from './Tab';
import Tabs from './Tabs';
import Toast from './Toast';

import './utils/styles/index.css';const components = [Avatar,AvatarGroup,Badge,BadgeAnchor,Button,Capacity,Card,CheckBox,Code,Col,Dot,Input,Link,Loading,Radio,RadioGroup,Row,Snippet,Spacer,Switch,Tab,Tabs,Toast];const install = (vue) => {
  if (!install.installed) {
    components.map((component) => {
      component.install(vue)
    })
  }
  return
};
export default { install };
