import { defineComponent } from 'vue'
import './card.content.less'

const CardContent = defineComponent({
  setup(props, { attrs, slots }) {
    return () => (
      <>
        <div className={'fect-card-content'}>{slots && slots.default()}</div>
      </>
    )
  },
})

export default CardContent
