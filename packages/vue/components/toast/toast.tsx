import { PropType, defineComponent, CSSProperties, computed } from 'vue'
import { createName, NormalTypes } from '../utils'

import './index.less'

const name = createName('Toast')

const renderBgColor = (type: NormalTypes) => {
  const bgColorsPool: Record<NormalTypes, string> = {
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

export default defineComponent({
  name,
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
        <div class="fect-toast__message">{props.text}</div>
      </div>
    )
  },
})
