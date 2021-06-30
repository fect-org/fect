import { defineComponent, ref, Teleport, onMounted, nextTick, watch } from 'vue'
import { useRect, useResize } from '../utils'

const getRect = (ref: Element) => {
  const { width, height, top, left } = useRect(ref)
  return {
    width,
    height,
    left,
    top: top + height,
  }
}

const SelectDropDown = defineComponent({
  props: {
    visible: Boolean,
    parentRef: HTMLDivElement,
  },
  setup(props, { slots }) {
    const dropdownRef = ref<HTMLDivElement>()
    const { width, height } = useResize()

    const setPosition = () => {
      nextTick(() => {
        if (props.parentRef && dropdownRef.value) {
          const { width, top, left } = getRect(props.parentRef)
          const style = {
            width: `${width}px`,
            top: `${top + 2}px`,
            left: `${left}px`,
          }
          dropdownRef.value.style.width = style.width
          dropdownRef.value.style.top = style.top
          dropdownRef.value.style.left = style.left
        }
      })
    }

    onMounted(setPosition)
    watch([width, height], setPosition)

    return () => (
      <Teleport to="body">
        <div
          class="fect-select__dropdown"
          ref={dropdownRef}
          v-show={props.visible}
        >
          {slots.default?.()}
        </div>
      </Teleport>
    )
  },
})

export default SelectDropDown
