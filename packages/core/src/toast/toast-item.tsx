import { defineComponent, computed, Transition } from 'vue'
import Button from '../button'
import { toastProps } from './props'
import { createBem, isArray, len } from '../utils'
import type { CSSProperties, PlaceTypes } from '../utils'
import { ToastOptions } from './interface'

const bem = createBem('fect-toast')

const getTranslateByPlacement = (placement: PlaceTypes) => {
  const translateEnter: Record<PlaceTypes, string> = {
    topLeft: 'translate(-60px, -60px)',
    topRight: 'translate(60px, -60px)',
    bottomLeft: 'translate(-60px, 60px)',
    bottomRight: 'translate(60px, 60px)'
  }
  const translateLeave: Record<PlaceTypes, string> = {
    topLeft: 'translate(-50px, 15px) scale(0.85)',
    topRight: 'translate(50px, 15px) scale(0.85)',
    bottomLeft: 'translate(-50px, -15px) scale(0.85)',
    bottomRight: 'translate(50px, -15px) scale(0.85)'
  }
  return {
    enter: translateEnter[placement],
    leave: translateLeave[placement]
  }
}

const makeToastActions = (actions: ToastOptions['actions'], cancel: () => void) => {
  if (isArray(actions)) {
    if (!len(actions)) return null
    return actions.map((action, index) => {
      if (typeof action !== 'function') return null
      return <div key={`action-${index}`}>{action(cancel)}</div>
    })
  }
  if (actions === 'cancel')
    return (
      <Button class={bem('action')} type="secondary" auto size="mini" onClick={() => cancel()}>
        cancel
      </Button>
    )
  return null
}

export default defineComponent({
  props: toastProps,
  emits: ['cancel'],
  setup(props) {
    const setToastTransition = computed(() => {
      const { enter, leave } = getTranslateByPlacement(props.toast.placement)
      return {
        '--toast-transition-enter': enter,
        '--toast-transition-leave': leave
      } as CSSProperties
    })

    return () => {
      const { visible, text, type, actions, cancel } = props.toast
      return (
        <Transition name="toast-fade" appear>
          {visible && (
            <div class={bem(null, type)} style={setToastTransition.value}>
              <div class={bem('message')}>{text}</div>
              <div class={bem('actions')}>{makeToastActions(actions, cancel)}</div>
            </div>
          )}
        </Transition>
      )
    }
  }
})
