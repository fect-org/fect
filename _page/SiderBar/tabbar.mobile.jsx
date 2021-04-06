import { defineComponent } from 'vue'

import './sidebar.mobile.less'

const TabbarMobile = defineComponent({
  emits: ['click'],
  setup(props, { emit }) {
    const handlerTap = () => emit('click')

    return () => (
      <div className="f_doc-tab_mobile">
        <div className="f_doc-tab-icons" onClick={handlerTap}>
          <fect-icon icon="navigation" size="20" color="var(--accents-7)" />
        </div>
        <span>@FECT-UI/VUE</span>
      </div>
    )
  },
})

export default TabbarMobile
