import { createRouter, createWebHistory } from 'vue-router'
import Avatar from '../../docs/zh-cn/components/avatar.mdx'
import Button from '../../docs/zh-cn/components/button.mdx'
import Capacity from '../../docs/zh-cn/components/capacity.mdx'
import Card from '../../docs/zh-cn/components/card.mdx'
import Dot from '../../docs/zh-cn/components/dot.mdx'
import Layout from '../../docs/zh-cn/components/layout.mdx'
import Link from '../../docs/zh-cn/components/link.mdx'
import Loading from '../../docs/zh-cn/components/loading.mdx'
import Radio from '../../docs/zh-cn/components/radio.mdx'
import Spacer from '../../docs/zh-cn/components/spacer.mdx'
import Switch from '../../docs/zh-cn/components/switch.mdx'
import Install from '../../docs/zh-cn/quickStart/install.mdx'
import Introduce from '../../docs/zh-cn/quickStart/introduce.mdx'

const routes = [
  { path: '/', redirect: { name: 'Introduce' } },
  { path: '/avatar', name: 'Avatar', component: Avatar },
  { path: '/button', name: 'Button', component: Button },
  { path: '/capacity', name: 'Capacity', component: Capacity },
  { path: '/card', name: 'Card', component: Card },
  { path: '/dot', name: 'Dot', component: Dot },
  { path: '/layout', name: 'Layout', component: Layout },
  { path: '/link', name: 'Link', component: Link },
  { path: '/loading', name: 'Loading', component: Loading },
  { path: '/radio', name: 'Radio', component: Radio },
  { path: '/spacer', name: 'Spacer', component: Spacer },
  { path: '/switch', name: 'Switch', component: Switch },
  { path: '/install', name: 'Install', component: Install },
  { path: '/introduce', name: 'Introduce', component: Introduce },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
