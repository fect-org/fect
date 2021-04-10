import { defineComponent, reactive } from 'vue'
import { createProvider } from '../../packages/utils'
import SideItem from './sidebar.item'
import Widgets from './widgets'

import docs from '../../docs/index'

const READONLY_SIDEBAR_KEY = 'siebarKey'
const SideBar = defineComponent({
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_SIDEBAR_KEY)
    const Routes = reactive(docs['zh-cn'])
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
