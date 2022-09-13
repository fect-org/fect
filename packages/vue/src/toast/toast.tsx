import { defineComponent } from 'vue'
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

    let timer: number | undefined

    const ToastContainerMouseHandler = (state: boolean) => {
      const { updateHovering } = context
      if (state) {
        timer && window.clearTimeout(timer)
        updateHovering(state)
        return
      }
      timer = window.setTimeout(() => {
        updateHovering(state)
        timer && window.clearTimeout(timer)
      }, 200)
    }

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

    return () => (
      <div
        class={bem('container', { hover: context.isHovering.value })}
        onMouseenter={() => ToastContainerMouseHandler(true)}
        onMouseleave={() => ToastContainerMouseHandler(false)}
      >
        {renderToasts()}
      </div>
    )
  }
})
