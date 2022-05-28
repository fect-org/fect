import { defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem, isDEV } from '../utils'
import { useToastContext } from './toast-contenxt'
import ToastItem from './toast-item'

const name = createName('Toast')
const bem = createBem('fect-toast')

import './index.less'

export default defineComponent({
  name,
  setup(props) {
    const [hover, setHover] = useState<boolean>(false)
    const { context } = useToastContext()

    if (!context) {
      if (isDEV) {
        console.error(
          "[Fect] <Toast> must be called by static methods or function call. Please don't use Toast component in your project."
        )
      }
      return
    }

    let timer: any

    const hoverHandler = (state: boolean) => {
      if (state) {
        timer && clearTimeout(timer)
        context!.updateHovering(state)
        return setHover(state)
      }
      timer = setTimeout(() => {
        setHover(state)
        context!.updateHovering(state)
        timer && clearTimeout(timer)
      }, 200)
    }

    const ToastContainerMouseHandler = (state: boolean) => {
      //
    }

    const renderToasts = () => {
      const { toasts } = context!
      return toasts.value.map((toast, idx) => (
        <ToastItem
          text={toast.text}
          type={toast.type}
          closeAble={toast.closeAble}
          willBeDestroy={toast.willBeDestroy}
          index={idx}
          hover={hover.value}
          total={toasts.value.length}
          key={`toast-${idx}`}
          onCancel={toast.cancel}
        />
      ))
    }

    return () => (
      <div
        class={bem('container', { hover: hover.value })}
        onMouseenter={() => ToastContainerMouseHandler(true)}
        onMouseleave={() => ToastContainerMouseHandler(false)}
      >
        {renderToasts()}
      </div>
    )
  }
})
