import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
import ActiveCate from '../ActiveCate'
const READONLY_SIDEBAR_KEY = 'siebarKey'
const SideItem = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_SIDEBAR_KEY)
    return () => (
      <>
        {ctx.route.map((item) => (
          <div key={`${item.name}-${item.route}`}>
            <ActiveCate routerTo={item.route} routerName={item.title} />
          </div>
        ))}
      </>
    )
  },
})

export default SideItem
