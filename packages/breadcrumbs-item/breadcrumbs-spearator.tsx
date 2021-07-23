import { defineComponent } from 'vue'

const Separator = defineComponent({
  setup(props, { slots }) {
    return () => (
      <div class="fect-breadcrumbs__separator">{slots.default?.()}</div>
    )
  },
})

export default Separator
