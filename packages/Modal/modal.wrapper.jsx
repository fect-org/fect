import { defineComponent, Transition } from 'vue'
import { useProvider } from '../utils'
import ModalTitle from './modal.title'
import ModalAction from './modal.action'
import { READONLY_MODAL_KEY } from './ModalKey'

import './modal.wrapper.less'

const ModalWrapper = defineComponent({
  setup(props, { attrs, slots }) {
    const { ctx } = useProvider(READONLY_MODAL_KEY)
    const renderCustomTitle = () => {
      const titleSlot = slots['title']
      return (
        <>
          {titleSlot ? (
            <div class="fect-modal_title__container">{titleSlot()}</div>
          ) : (
            <ModalTitle />
          )}
        </>
      )
    }

    const renderCustomAction = () => {
      const actionSlot = slots['action']
      return <>{actionSlot ? actionSlot() : <ModalAction />}</>
    }

    return () => (
      <Transition name="fect-dialog_slide">
        {ctx.props.visible ? (
          <div
            role="dialog"
            class="fect-modal_wrapper"
            {...attrs}
            style={{ width: ctx.props.width }}
          >
            {renderCustomTitle()}
            <div class="fect-modal_content"> {slots.default?.()}</div>
            {renderCustomAction()}
          </div>
        ) : (
          ''
        )}
      </Transition>
    )
  },
})

export default ModalWrapper
