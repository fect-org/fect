import { computed } from 'vue'
import { createNameSpace } from '../utils'
import CardContent from './card-content'
import './index.less'

const [createComponent] = createNameSpace('Card')

export default createComponent({
  props: {
    hoverable: Boolean,
    shadow: Boolean,
  },
  setup(props, { slots }) {
    const setClass = computed(() => {
      const names = []
      props.shadow && names.push('shadow')
      props.hoverable && names.push('hoverable')
      return names.join(' ')
    })
    return () => (
      <div class={`fect-card ${setClass.value}`}>
        <CardContent v-slots={slots} />
      </div>
    )
  },
})
