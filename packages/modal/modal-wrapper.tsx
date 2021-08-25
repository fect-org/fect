import { defineComponent, ref } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import ModalAction from './modal-action'
import ModalTitle from './modal-title'

import { READONLY_MODAL_KEY, ModalProvide } from './type'

const ModalWrapper = defineComponent({
  setup(props, { slots }) {
    const { context } = useProvider<ModalProvide>(READONLY_MODAL_KEY)

    const renderTitle = () => {
      const titleSlot = slots['title']
      return titleSlot ? (
        <div class="fect-modal__title">{titleSlot()}</div>
      ) : (
        <ModalTitle />
      )
    }

    const renderAction = () => {
      const actionSlot = slots['action']
      return actionSlot ? actionSlot() : <ModalAction />
    }

    const renderWrapper = () => {
      const { width } = context?.props!
      return (
        <div
          role="dialog"
          tabindex={-1}
          class="fect-modal__wrapper"
          style={{ width }}
        >
          {renderTitle()}
          <div class="fect-modal__content">{slots.default?.()}</div>
          {renderAction()}
        </div>
      )
    }

    return () => renderWrapper()
  },
})

export default ModalWrapper
