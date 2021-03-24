import { computed, toRefs } from 'vue'
import { createNameSpace } from '../utils'
import CardContent from './card.content'

const [createComponent] = createNameSpace('Card')
import './card.less'

export default createComponent({
  props: {
    hoverable: Boolean,
    shadow: Boolean,
  },
  setup(props, { attrs, slots, emit }) {
    const { hoverable, shadow } = toRefs(props)

    const clacClass = computed(() => {
      let str = ''
      shadow.value && (str += ' shadow')
      hoverable.value && (str += ' hoverable')
      return str.trim()
    })

    return () => (
      <>
        <div
          {...attrs}
          className={`fect-card ${clacClass.value} ${
            attrs.class ? attrs.class : ''
          }`}
          style={attrs.style ? attrs.style : false}
        >
          <CardContent>{slots.default?.()}</CardContent>
        </div>
      </>
    )
  },
})
