import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
const READONLY_SIDEBAR_KEY = 'siebarKey'
const SideItem = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_SIDEBAR_KEY)
    const { route } = ctx
    return () => (
      <>
        {route.map((item, i) => (
          <div className="item" key={`${item.name}-${item.index}`}>
            <FayLink to={item.url}>{item.name}</FayLink>
          </div>
        ))}
      </>
    )
  },
})

export default SideItem
