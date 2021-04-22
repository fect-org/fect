import { defineComponent } from 'vue'

const Separator = defineComponent({
  setup(props, { slots }) {
    return () => <div className="fect-bread_separator">{slots.default?.()}</div>
  },
})

export default Separator
