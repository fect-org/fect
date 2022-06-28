import { defineComponent } from 'vue'
import { useModalContext } from './modal-context'
import { createBem } from '../utils'
import type { Action } from './interface'
import Button from '../button'

const bem = createBem('fect-modal')

export default defineComponent({
  setup(props, { slots }) {
    const { context } = useModalContext()

    const renderTitle = () => {
      const titleSlot = slots['title']
      return <div class={bem('title')}>{titleSlot ? titleSlot() : <h2 class="title">{context?.props.title}</h2>}</div>
    }

    const modalActionClickHandler = (e: Event, action: Action) => {
      e.stopPropagation()
      e.preventDefault()
      context?.closeModal(action)
    }

    const renderAction = () => {
      const actionSlot = slots['action']
      return actionSlot ? (
        actionSlot()
      ) : (
        <footer class={bem('action')}>
          <Button class={bem('button')} onClick={(e) => modalActionClickHandler(e, 'cancel')}>
            {context?.props.cancel}
          </Button>
          <Button class={bem('button')} onClick={(e) => modalActionClickHandler(e, 'confirm')}>
            {context?.props.done}
          </Button>
        </footer>
      )
    }

    const renderWrapper = () => {
      const { width } = context!.props
      return (
        <div role="dialog" tabindex={-1} class={bem('wrapper')} style={{ width }}>
          {renderTitle()}
          <div class={bem('content')}>{slots.default?.()}</div>
          {renderAction()}
        </div>
      )
    }

    return () => renderWrapper()
  }
})
