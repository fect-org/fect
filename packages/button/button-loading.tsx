import { defineComponent } from 'vue'

import Loading from '../loading'

const ButtonLoading = defineComponent({
  setup(props, { attrs }) {
    return () => (
      <div class="fect-btn-loading">
        <Loading />
      </div>
    )
  },
})

export default ButtonLoading
