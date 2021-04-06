import { defineComponent, computed, ref } from 'vue'
import { createProvider } from '../../packages/utils/createContext'
import SideBar from '../SiderBar'
import TabbarMobile from '../SiderBar/tabbar.mobile'
import './layout.common.less'

const READONLY_LAYOUT_KEY = 'layoutKey'

const Layout = defineComponent({
  setup(props, { slots }) {
    const isScroll = ref(false)
    const { provider } = createProvider(READONLY_LAYOUT_KEY)
    const handlerMobileTabbarClick = () => {
      isScroll.value = !isScroll.value
      console.log(isScroll.value)
    }
    const inMobileScroll = computed(() => (isScroll.value ? 'isAcive' : ''))
    provider({ handlerMobileTabbarClick, isScroll })
    return () => (
      <div className="f_doc_layout">
        <TabbarMobile onClick={handlerMobileTabbarClick} />
        <aside className={`f_doc-sidebar ${inMobileScroll.value}`}>
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
