import { defineComponent } from 'vue'

const CardContent = defineComponent({
  setup(props, { attrs, slots }) {
    return () => (
      <>
        <div class={'fect-card-content'}>{slots.default?.()}</div>
      </>
    )
  },
})

export default CardContent
