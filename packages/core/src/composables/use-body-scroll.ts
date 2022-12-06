import { useState } from '@fect-ui/vue-hooks'
import { watch } from 'vue'

const elementStack = new Map<
  HTMLElement,
  {
    last: string
  }
>()

export const useBodyScroll = () => {
  const [lock, setLock] = useState<boolean>(false)

  const actions = {
    el: document.body,
    add() {
      this.el.style.overflow = 'hidden'
    },
    reset() {
      const store = elementStack.get(this.el)
      if (store) this.el.style.overflow = store.last
    }
  }

  watch(
    () => lock.value,
    (cur) => {
      if (cur) {
        elementStack.set(actions.el, { last: actions.el.style.overflow })
        actions.add()
        return
      }
      if (!elementStack.has(actions.el)) return
      actions.reset()
    }
  )

  return { lock, setLock }
}
