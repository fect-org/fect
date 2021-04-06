import { defineComponent } from 'vue'
import { createProvider } from '../../packages/utils'
import SideItem from './sidebar.item'

import Widgets from './widgets'
const READONLY_SIDEBAR_KEY = 'siebarKey'
const SideBar = defineComponent({
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_SIDEBAR_KEY)
    const Routes = [
      {
        title: '快速上手',
        rule: [
          {
            name: '什么是Fect UI',
            url: '/zh-cn/quickStart/introduce',
            index: 1,
          },
          { name: '安装', url: '/zh-cn/quickStart/install', index: 2 },
        ],
      },
    ]
    provider({ route: Routes })
    return () => (
      <div className="f_doc-side">
        <Widgets />
        <SideItem />
      </div>
    )
  },
})

export default SideBar
