import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
import ActiveCate from '../ActiveCate'
const READONLY_SIDEBAR_KEY = 'siebarKey'
const SideItem = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_SIDEBAR_KEY)
    const { route } = ctx
    return () => (
      <>
        {route[0].rule.map((item) => (
          // className="item"
          <div key={`${item.name}-${item.index}`}>
            <ActiveCate routerTo={item.url} routerName={item.name} />
          </div>
        ))}
      </>
    )
  },
})

export default SideItem
