import { UnknowProp } from '../utils/base'
import { defineComponent } from 'vue'

const ButtonIcon = defineComponent({
  props: {
    icon: UnknowProp,
  },
  setup(props) {
    return () => <span class="fect-button__icon">{props.icon}</span>
  },
})

export default ButtonIcon
