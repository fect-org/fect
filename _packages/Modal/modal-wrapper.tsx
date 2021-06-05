import { defineComponent, Transition } from 'vue'
import { useProvider } from '../utils'
import ModalTitle from './modal-title'
import ModalAction from './modal-action'
import { READONLY_MODAL_KEY, ModalProvide } from './type'

const ModalWrapper = defineComponent({
  setup(props, { slots }) {
    const { context } = useProvider<ModalProvide>(READONLY_MODAL_KEY)

    const renderTitle = () => {
      const titleSlot = slots['title']
      return (
        (titleSlot && (
          <div class="fect-modal_title__container">{titleSlot()}</div>
        )) || <ModalTitle />
      )
    }

    const renderAction = () => {
      const actionSlot = slots['action']
      return (actionSlot && actionSlot()) || <ModalAction />
    }

    const renderWrapper = () => {
      const { width } = context?.props!
      return (
        <div role="dialog" class="fect-modal_wrapper" style={{ width }}>
          {renderTitle()}
          <div class="fect-modal_content"> {slots.default?.()}</div>
          {renderAction()}
        </div>
      )
    }

    return () => (
      <Transition name="fect-dialog_slide">
        {context?.props.visible && renderWrapper()}
      </Transition>
    )
  },
})

export default ModalWrapper
