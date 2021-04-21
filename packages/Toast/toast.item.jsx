import { defineComponent, computed } from 'vue'
import { useProvider } from '../utils'
import './toast.item.less'

const READNONLY_TOAST_KEY = 'toastKey'

const renderBgColor = (type) => {
  const bgColorsPool = {
    default: 'var(--primary-background)',
    success: 'var(--success-default)',
    warning: 'var(--warning-default)',
    error: 'var(--error-default)',
  }
  const isDefault = type !== '' && type === 'default'
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
    }
  }
  return {
    backgroundColor: bgColorsPool[type],
    color: 'white',
  }
}

const ToastItem = defineComponent({
  setup() {
    const { ctx } = useProvider(READNONLY_TOAST_KEY)
    const usebgColor = computed(() => renderBgColor(ctx.type))
    return () => (
      // visible
      <div className="fect-toast " style={usebgColor.value}>
        <div className="fect-toast-message">{ctx.text}</div>
      </div>
    )
  },
})

export default ToastItem
