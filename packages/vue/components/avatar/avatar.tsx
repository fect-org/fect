import { PropType, computed, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, NormalSizes } from '../utils'
import './index.less'

const name = createName('Avatar')

export default defineComponent({
  name,
  props: {
    stacked: Boolean,
    isSquare: Boolean,
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium'
    },
    text: {
      type: String,
      default: ''
    },
    src: String,
    className: String,
    alt: String
  },
  setup(props, { attrs }) {
    const [showText] = useState<boolean>(!props.src)

    const safeText = (text: string) => (text.length <= 4 ? text : text.slice(0, 3))

    const setClass = computed(() => {
      const names: string[] = [props.size]
      props.isSquare && names.push('isSquare')
      props.stacked && names.push('stacked')
      return names.join(' ')
    })

    return () => (
      <div class={`fect-avatar ${setClass.value} ${props.className || ''}`}>
        {!showText.value && <img src={props.src} draggable="false" alt={props.alt} {...attrs} />}
        {showText.value && (
          <span class={'fect-avatar-text '} {...attrs}>
            {safeText(props.text)}
          </span>
        )}
      </div>
    )
  }
})
