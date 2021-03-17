import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
import ActiveCateLog from './active-catelog'
import ActiveLink from './active-link'
const READONLY_SIDEBAR_KEY = 'siebarKey'
const SideItem = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_SIDEBAR_KEY)
    const { route } = ctx
    return () => (
      <>
        <ActiveCateLog name={route[0].title} />
        {route[0].rule.map((item) => (
          // className="item"
          <div key={`${item.name}-${item.index}`}>
            <ActiveLink href={item.url} text={item.name} />
          </div>
        ))}
      </>
    )
  },
})

export default SideItem
