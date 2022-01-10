import { defineComponent, CSSProperties, computed, watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { props } from './props'
import type { CustomCSSProperties, NormalTypes } from '../utils'

const getToastColor = (type: NormalTypes): CSSProperties => {
  const bgColorsPool: Record<NormalTypes, string> = {
    default: 'var(--primary-background)',
    success: 'var(--success-default)',
    warning: 'var(--warning-default)',
    error: 'var(--error-default)'
  }
  const isDefault = type === 'default'
  return {
    backgroundColor: bgColorsPool[type] || bgColorsPool['default'],
    color: isDefault ? 'var(--primary-foreground)' : 'white'
  }
}

const getTranslate = (reverseIndex: number, onHover: boolean, total: number) => {
  const calc = `100% + -75px + -${20 * reverseIndex}px`
  if (reverseIndex >= 4) return `translate3d(0, -75px, -${reverseIndex}px) scale(.7)`
  if (onHover) {
    return `translate3d(0, ${reverseIndex * -75}px, -${reverseIndex}px) scale(${total === 1 ? 1 : 0.98205})`
  }
  return `translate3d(0, calc(${calc}), -${reverseIndex}px) scale(${1 - 0.05 * reverseIndex})`
}

export default defineComponent({
  props,
  emits: ['cancel'],
  setup(props, { emit }) {
    const [visible, setVisible] = useState<boolean>(false)

    const [hidden, setHidden] = useState<boolean>(false)

    const reverseIndex = computed(() => props.total - (props.index + 1))

    watchEffect((onInvalidate) => {
      const timer = setTimeout(() => {
        setVisible(true)
        clearTimeout(timer)
      }, 10)
      onInvalidate(() => clearTimeout(timer))
    })

    watchEffect((onInvalidate) => {
      let unMount = false
      const shouldBeHide = reverseIndex.value > 2 || props.willBeDestroy
      if (!shouldBeHide || unMount) return
      const timer = setTimeout(() => {
        setHidden(true)
        clearTimeout(timer)
      }, 150)
      onInvalidate(() => {
        unMount = true
        clearTimeout(timer)
      })
    })

    const setStyle = computed(() => {
      const translate = getTranslate(reverseIndex.value, props.hover, props.total)
      return {
        '--toast-translate': translate,
        '--toast-opacity': reverseIndex.value > 4 ? 0 : 1,
        '--toast-shadow': reverseIndex.value > 4 ? 'none' : 'var(--fay-shadowSmall)',
        ...getToastColor(props.type)
      } as CustomCSSProperties
    })

    return () => {
      if (reverseIndex.value > 10) return null
      return (
        <div
          class={`fect-toast ${visible.value ? 'visible' : ''} ${hidden.value ? 'hidden' : ''}`}
          style={setStyle.value}
        >
          <div class="fect-toast__message">{props.text}</div>
          {props.closeAble && (
            <span class="fect-toast__closeable" onClick={() => emit('cancel')}>
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                shape-rendering="geometricPrecision"
                viewBox="0 0 24 24"
                height="16"
                width="16"
                data-v-8357e50e=""
                style="color: currentcolor;"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </span>
          )}
        </div>
      )
    }
  }
})
