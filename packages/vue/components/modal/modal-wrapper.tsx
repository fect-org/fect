import { defineComponent } from 'vue'
import ModalAction from './modal-action'
import ModalTitle from './modal-title'
import { useModalContext } from './modal-context'
import { createBem } from '../utils'

const bem = createBem('fect-modal')

export default defineComponent({
  setup(props, { slots }) {
    const { context } = useModalContext()

    const renderTitle = () => {
      const titleSlot = slots['title']
      return titleSlot ? <div class={bem('title')}>{titleSlot()}</div> : <ModalTitle />
    }

    const renderAction = () => {
      const actionSlot = slots['action']
      return actionSlot ? actionSlot() : <ModalAction />
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
