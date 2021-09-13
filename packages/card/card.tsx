import { computed, defineComponent } from 'vue'
import { createName } from '../utils'
import CardContent from './card-content'
import './index.less'

const name = createName('Card')

export default defineComponent({
  name,
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
