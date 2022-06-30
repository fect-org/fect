import { defineComponent, nextTick, ref, Transition, watch } from 'vue'
import { useModalContext } from './modal-context'
import { createBem, isChildElement } from '../utils'
import type { Action } from './interface'
import Button from '../button'

const bem = createBem('fect-modal')

export default defineComponent({
  inheritAttrs: false,
  props: {
    visible: Boolean
  },
  setup(props, { slots, attrs }) {
    const modalRef = ref<HTMLDivElement>()
    const tabStartRef = ref<HTMLDivElement>()
    const tabEndRef = ref<HTMLDivElement>()
    const { context } = useModalContext()

    const renderTitle = () => {
      const titleSlot = slots['title']
      return <div class={bem('title')}>{titleSlot ? titleSlot() : <h2 class="title">{context?.props.title}</h2>}</div>
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

    const modalActionClickHandler = (e: Event, action: Action) => {
      e.stopPropagation()
      e.preventDefault()
      context?.closeModal(action)
    }

    watch(
      () => props.visible,
      (visible) => {
        if (!visible) return
        const { activeElement } = document
        const isChild = isChildElement(modalRef.value, activeElement)
        if (isChild) return
        nextTick(() => tabStartRef.value?.focus())
      }
    )

    const onKeyDown = (e: KeyboardEvent) => {
      const isTabDown = e.keyCode === 9
      if (!props.visible || !isTabDown) return
      const { activeElement } = document
      if (e.shiftKey) {
        if (activeElement === tabStartRef.value) {
          tabEndRef.value?.focus()
        }
      } else {
        if (activeElement === tabEndRef.value) {
          tabStartRef.value?.focus()
        }
      }
    }

    const renderWrapper = () => {
      const { width } = context!.props
      return (
        <Transition name="modal-fade">
          <div
            role="dialog"
            ref={modalRef}
            v-show={props.visible}
            tabindex={-1}
            class={bem('wrapper')}
            style={{ width }}
            onKeydown={onKeyDown}
            {...attrs}
          >
            <div class={bem('hidden')} tabindex={0} aria-hidden="true" ref={tabStartRef} />
            {renderTitle()}
            <div class={bem('content')}>{slots.default?.()}</div>
            {renderAction()}
            <div class={bem('hidden')} tabindex={0} aria-hidden="true" ref={tabEndRef} />
          </div>
        </Transition>
      )
    }

    return () => renderWrapper()
  }
})
