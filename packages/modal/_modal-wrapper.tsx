import { computed, defineComponent, Transition } from 'vue'
import ModalAction from './modal-action'
import ModalTitle from './modal-title'

const ModalWrapepr = defineComponent({
  setup(props, { slots }) {
    const renderTitle = () => {
      const titleSlot = slots['title']
      return titleSlot ? <div class="fect-modal__title"></div> : <ModalTitle />
    }

    const renderAction = () => {
      const actionSlot = slots['action']
      return actionSlot ? actionSlot() : <ModalAction />
    }

    const renderWrapper = () => {
      return (
        <div class="fect-modal__wrapper">
          {renderTitle()}
          <div class="fect-modal__content">{slots.default?.()}</div>
          {renderAction()}
        </div>
      )
    }

    return () => <Transition>{renderWrapper()}</Transition>
  },
})

export default ModalWrapepr
