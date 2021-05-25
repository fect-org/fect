import { defineComponent, onMounted, ref, Teleport } from 'vue'

import { useRect, useProvider } from '../utils'

const READONLY_SELECT_KEY = 'selectKey'

const getOffset = (el) => {
  if (!el) return { top: 0, left: 0 }
  const { top, left } = el.getBoundingClientRect()
  return { top, left }
}

const getRect = (ref, parent) => {
  const rect = useRect(ref)
  const container = parent ? parent() : null
  const scrollElement = container || document.documentElement
  const { top: offsetTop, left: offsetLeft } = getOffset(container)
  return {
    ...rect,
    width: rect.width || rect.right - rect.left,
    top: rect.bottom + scrollElement.scrollTop - offsetTop,
    left: rect.left + scrollElement.scrollLeft - offsetLeft,
  }
}

const SelectDropDown = defineComponent({
  setup(props, { slots }) {
    const dropDownRef = ref(null)

    const { ctx } = useProvider(READONLY_SELECT_KEY)
    console.log(ctx)
    onMounted(() => {
      const v = getRect(dropDownRef, ctx.renderSelect)
      const r = useRect(ctx.renderSelect())
      console.log(r)
      console.log(v)
    })

    return () => (
      <Teleport to=".fect-select__option-wrapper">
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
