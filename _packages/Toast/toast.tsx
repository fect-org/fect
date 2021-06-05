import { PropType, Teleport, CSSProperties, computed } from 'vue'
import { createNameSpace } from '../utils'
import { NormalTypes } from '../utils/theme/propTypes'

import './toast.less'

const [createComponent] = createNameSpace('Toast')

const renderBgColor = (type: NormalTypes) => {
  const bgColorsPool: { [key in NormalTypes]: string } = {
    default: 'var(--primary-background)',
    success: 'var(--success-default)',
    warning: 'var(--warning-default)',
    error: 'var(--error-default)',
  }
  const isDefault = type === 'default'
  /**
   * Prevent main color change in special types
   * Toast backgroundcolor only follow the theme type change
   * others can't change the style ,unless you modify the style
   */
  if (isDefault) {
    return {
      backgroundColor: bgColorsPool[type],
      color: 'var(--primary-foreground)',
      border: '1px solid var(--accents-2)',
    } as CSSProperties
  }
  return {
    backgroundColor: bgColorsPool[type],
    color: 'white',
  } as CSSProperties
}

export default createComponent({
  props: {
    text: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default',
    },
  },
  setup(props) {
    const setBgColor = computed(() => renderBgColor(props.type))

    return () => (
      <div class="fect-toast" style={setBgColor.value}>
        <div class="fect-toast-message">{props.text}</div>
      </div>
    )
  },
})
