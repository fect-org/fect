import { computed, toRefs } from 'vue'
import { theme, createNameSpace } from '../utils'
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
    console.log(attrs.class)
    const safeSlots = !!slots?.default
    const clacClass = computed(() => {
      let str = ''
      shadow.value && (str += ' shadow')
      hoverable.value && (str += ' hoverable')
      return str.trim()
    })

    return () => (
      <>
        <div
          className={`fay-card ${clacClass.value} ${
            attrs.class ? attrs.class : ''
          }`}
          style={attrs.style ? attrs.style : false}
        >
          <CardContent>{safeSlots && slots.default()}</CardContent>
        </div>
      </>
    )
  },
})
