import { defineComponent } from 'vue'

import './sidebar.mobile.less'

const TabbarMobile = defineComponent({
  setup() {
    return () => (
      <div className="f_doc-tab_mobile">
        <fect-icon icon="navigation" size="20" color="var(--accents-7)" />
        <span>@FECT-UI/VUE</span>
      </div>
    )
  },
})

export default TabbarMobile
