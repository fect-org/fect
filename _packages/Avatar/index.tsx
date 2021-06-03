import { PropType, ref, computed } from 'vue'
import { createNameSpace } from '../utils'
import { NormalSizes } from '../utils/theme/propTypes'

const [createComponent] = createNameSpace('Avatar')

import './avatar.less'

export default createComponent({
  props: {
    stacked: Boolean,
    isSquare: Boolean,
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    text: {
      type: String,
      default: '',
    },
    src: String,
    className: String,
  },
  setup(props, { attrs }) {
    const showText = ref<boolean>(!props.src)

    const safeText = (text: string): string =>
      text.length <= 4 ? text : text.slice(0, 3)

    const setClass = computed(() => {
      const names: string[] = [props.size]
      props.isSquare && names.push('isSquare')
      props.stacked && names.push('stacked')
      return names.join(' ')
    })

    return () => (
      <div class={`fect-avatar ${setClass.value} ${props.className || ''}`}>
        {!showText.value && (
          <img src={props.src} draggable="false" {...attrs} />
        )}
        {showText.value && (
          <span class={`fect-avatar-text `} {...attrs}>
            {safeText(props.text)}
          </span>
        )}
      </div>
    )
  },
})
