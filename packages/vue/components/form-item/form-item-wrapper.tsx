import { defineComponent, Fragment } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { READONLY_FORM_KEY } from '../form/type'

export default defineComponent({
  props: {
    useAutoWidth: Boolean,
  },
  setup(props, { slots }) {
    const {} = useProvider<any>(READONLY_FORM_KEY)

    return () => {
      if (props.useAutoWidth) return <Fragment>{slots.default?.()}</Fragment>
      return <div>{slots.default?.()}</div>
    }
  },
})
