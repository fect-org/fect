import { createRouter, createWebHistory } from 'vue-router'
import avatar from '../../docs/zh-cn/components/avatar.mdx'
import button from '../../docs/zh-cn/components/button.mdx'
import capacity from '../../docs/zh-cn/components/capacity.mdx'
import card from '../../docs/zh-cn/components/card.mdx'
import dot from '../../docs/zh-cn/components/dot.mdx'
import layout from '../../docs/zh-cn/components/layout.mdx'
import link from '../../docs/zh-cn/components/link.mdx'
import loading from '../../docs/zh-cn/components/loading.mdx'
import radio from '../../docs/zh-cn/components/radio.mdx'
import spacer from '../../docs/zh-cn/components/spacer.mdx'
import int from '../../docs/zh-cn/quickStart/introduce.mdx'
import install from '../../docs/zh-cn/quickStart/install.mdx'

import switchA from '../../docs/zh-cn/components/switch.mdx'

const routes = [
  { path: '/zh-cn/quickStart/install', name: 'insatll', component: install },
  { path: '/zh-cn/quickStart/introduce', name: 'int', component: int },
  { path: '/avatar', name: 'avatar', component: avatar },
  { path: '/button', name: 'button', component: button },
  { path: '/capacity', name: 'capacity', component: capacity },
  { path: '/card', name: 'card', component: card },
  { path: '/dot', name: 'dot', component: dot },
  { path: '/layout', name: 'layout', component: layout },
  { path: '/link', name: 'link', component: link },
  { path: '/loading', name: 'loading', component: loading },
  { path: '/radio', name: 'radio', component: radio },
  { path: '/spacer', name: 'spacer', component: spacer },
  { path: '/switch', name: 'switch', component: switchA },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
