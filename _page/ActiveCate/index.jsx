import { defineComponent, watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProvider } from '../../packages/utils/createContext'
import './activecate.common.less'

const READONLY_LAYOUT_KEY = 'layoutKey'

const ActiveCate = defineComponent({
  props: {
    routerTo: {
      type: [String, Object],
    },
    routerName: String,
  },
  setup(props) {
    const router = useRouter()
    const isActive = ref(false)

    watchEffect(() => {
      isActive.value = router.currentRoute.value.name === props.routerTo.name
      if (isActive.value) {
        document.title = `${props.routerName} | Vue - Fect UI`
      }
    })

    const { ctx } = useProvider(READONLY_LAYOUT_KEY)
    const { handlerMobileTabbarClick } = ctx

    return () => (
      <div
        className="f_doc-active_cate"
        onClick={() => handlerMobileTabbarClick()}
      >
        <fe-link to={props.routerTo} color={isActive.value}>
          {props.routerName}
        </fe-link>
      </div>
    )
  },
})

export default ActiveCate
