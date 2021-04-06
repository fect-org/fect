import { defineComponent, watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProvider } from '../../packages/utils/createContext'
import './activecate.common.less'

const READONLY_LAYOUT_KEY = 'layoutKey'

const ActiveCate = defineComponent({
  props: {
    routerTo: {
      type: String,
    },
    routerName: String,
  },
  setup(props) {
    const route = useRoute()
    const isActive = ref(false)
    watchEffect(() => (isActive.value = route.path === props.routerTo))
    const { ctx } = useProvider(READONLY_LAYOUT_KEY)
    const { handlerMobileTabbarClick } = ctx
    return () => (
      <div
        className="f_doc-active_cate"
        onClick={() => handlerMobileTabbarClick()}
      >
        <fect-link to={props.routerTo} block color={isActive.value}>
          {props.routerName}
        </fect-link>
      </div>
    )
  },
})

export default ActiveCate
