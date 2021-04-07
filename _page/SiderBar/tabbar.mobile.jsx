import { defineComponent, computed } from 'vue'
import { useProvider } from '../../packages/utils'
import './sidebar.mobile.less'

const DarkShadow = 'rgba(255,255,255, 0.22)'
const LightShadow = 'rgba(0, 0, 0, 0.12)'

const READONLY_LAYOUT_KEY = 'layoutKey'

const TabbarMobile = defineComponent({
  emits: ['click'],
  setup(props, { emit }) {
    const { ctx } = useProvider(READONLY_LAYOUT_KEY)
    const handlerTap = () => emit('click')

    const theme = computed(() => {
      if (ctx.theme.value === 'light') return LightShadow
      return DarkShadow
    })
    return () => (
      <div
        className="f_doc-tab_mobile"
        style={{ boxShadow: ` 0 2px 5px 0 ${theme.value}` }}
      >
        <div className="f_doc-tab-icons" onClick={handlerTap}>
          <fect-icon icon="navigation" size="20" color="var(--accents-7)" />
        </div>
        <span>@FECT-UI/VUE</span>
      </div>
    )
  },
})

export default TabbarMobile
