import { defineComponent } from 'vue'
import { useProvider } from '../../packages/utils'
import ActiveCate from '../ActiveCate'
import './sidebar.item.less'
const READONLY_SIDEBAR_KEY = 'siebarKey'
const SideItem = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_SIDEBAR_KEY)

    return () => (
      <>
        {ctx.route.map((r, idx) => (
          <div className="r_doc-side_route-p" key={`${r.name}-${idx}`}>
            <span className="side_route-title">{r.name}</span>
            <div className="f_doc-side_route-c">
              {r.children.map((item, idx) => (
                <ActiveCate
                  routerTo={item.route}
                  routerName={item.title}
                  key={`${item.name}+${idx}`}
                />
              ))}
            </div>
          </div>
        ))}
      </>
    )
  },
})

export default SideItem
