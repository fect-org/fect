import { defineComponent, computed } from 'vue'
import { createName, createBem, isDEV } from '../utils'
import { useToastContext } from './toast-contenxt'
import ToastItem from './toast-item'

const name = createName('Toast')
const bem = createBem('fect-toast')

import './index.less'

export default defineComponent({
  name,
  setup() {
    const { context } = useToastContext()

    if (!context) {
      if (isDEV) {
        console.error(
          "[Fect] <Toast> must be called by static methods or function call. Please don't use Toast component in your project."
        )
      }
      return
    }

    const setToastClasses = computed(() => {
      const { layout: placement } = context
      const position = []
      if (placement.value.toLocaleLowerCase().startsWith('top')) position.push('top')
      if (placement.value.toLocaleLowerCase().endsWith('left')) position.push('left')
      return position.reduce((acc, cur) => Object.assign(acc, { [cur]: true }), {})
    })

    const renderToasts = () => {
      const { toasts } = context
      return toasts.value.map((toast, idx) => (
        <ToastItem
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignored
          toast={toast}
          key={`toast-${idx}`}
        />
      ))
    }

    return () => <div class={bem('container', setToastClasses.value)}>{renderToasts()}</div>
  }
})
