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
import swtich from '../../docs/zh-cn/components/swtich.mdx'

const routes = [
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
  { path: '/swtich', name: 'swtich', component: swtich },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
