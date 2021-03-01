import { defineComponent } from 'vue'
import './card.content.less'

const CardContent = defineComponent({
  setup(props, { attrs, slots }) {
    return () => (
      <>
        <div className={'fay-card-content '}>{slots && slots.default()}</div>
      </>
    )
  },
})

export default CardContent
