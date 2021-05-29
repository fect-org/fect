import { defineComponent, watchEffect, ref, Teleport, nextTick } from 'vue'

import { useRect, useProvider, useResize } from '../utils'

const READONLY_SELECT_KEY = 'selectKey'

const getRect = (ref) => {
  const rect = useRect(ref)
  const { width, height, top, left } = rect
  return {
    width,
    height,
    left,
    top: top + height,
  }
}

const SelectDropDown = defineComponent({
  setup(props, { slots }) {
    const dropDownRef = ref(null)
    const { ctx } = useProvider(READONLY_SELECT_KEY)
    const { width, height } = useResize()

    const setPosition = () => {
      nextTick(() => {
        const rect = getRect(ctx.selectRef)
        const { width, top, left } = rect

        const style = {
          width: `${width}px`,
          top: `${top + 2}px`,
          left: `${left}px`,
        }
        dropDownRef.value.style.width = style.width
        dropDownRef.value.style.top = style.top
        dropDownRef.value.style.left = style.left
      })
    }
    watchEffect(() => {
      if (width.value || height.value) {
        setPosition()
      }
    })

    return () => (
      <Teleport to="body">
        <div
          class="fect-select__dropdown"
          ref={dropDownRef}
          v-show={ctx.visible.value}
        >
          {slots.default?.()}
        </div>
      </Teleport>
    )
  },
})

export default SelectDropDown
