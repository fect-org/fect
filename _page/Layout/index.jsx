import { defineComponent } from 'vue'

import SideBar from '../SiderBar'
import TabbarMobile from '../SiderBar/tabbar.mobile'

import './layout.common.less'
const Layout = defineComponent({
  setup(props, { slots }) {
    return () => (
      <div className="f_doc_layout">
        <TabbarMobile />
        <aside className="f_doc-sidebar">
          <SideBar />
        </aside>
        <div className="f_doc-side-shadow" />
        <main className="f_doc-main">
          <div>{slots.default?.()}</div>
        </main>
      </div>
    )
  },
})

export default Layout
