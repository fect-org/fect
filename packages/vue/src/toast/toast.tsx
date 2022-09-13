import { defineComponent } from 'vue'
import { createName, createBem, isDEV, len } from '../utils'
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
      const { toasts, isHovering } = context
      const total = len(toasts.value as unknown[])
      return toasts.value.map((toast, idx) => (
        <ToastItem
          placement={toast.placement}
          text={toast.text}
          type={toast.type}
          closeAble={toast.closeAble}
          // willBeDestroy={toast.willBeDestroy}
          index={idx}
          hover={isHovering.value}
          total={total}
          key={`toast-${idx}`}
          onCancel={toast.cancel}
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
