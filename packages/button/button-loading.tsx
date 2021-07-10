import { defineComponent } from 'vue'
import { LoadingTypes } from '../utils/theme/propTypes'
import Loading from '../loading'

const ButtonLoading = defineComponent({
  props: {
    loadType: String,
  },
  setup(props, { attrs }) {
    return () => (
      <div class="fect-btn-loading">
        <Loading loadType={props.loadType as LoadingTypes} />
      </div>
    )
  },
})

export default ButtonLoading
