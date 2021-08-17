import { defineComponent, PropType } from 'vue'

const ButtonIcon = defineComponent({
  props: {
    icon: String as PropType<keyof HTMLElementTagNameMap>,
  },
  setup(props) {
    return () => <span class="fect-button__icon">{props.icon}</span>
  },
})

export default ButtonIcon
