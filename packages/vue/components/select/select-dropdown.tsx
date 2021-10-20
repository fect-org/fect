import { defineComponent, ref, Teleport, watch, Ref } from 'vue'
import { useRect, useResize } from '../utils'

type ElementRef = Element | Ref<Element | undefined>

const getRect = (ref: ElementRef) => {
  const rect = useRect(ref)
  const scrollElement = document.documentElement
  return {
    ...rect,
    width: rect.width || rect.right - rect.left,
    top: rect.bottom + scrollElement.scrollTop,
    left: rect.left + scrollElement.scrollLeft,
  }
}

const SelectDropDown = defineComponent({
  props: {
    visible: Boolean,
    parentRef: HTMLDivElement,
    teleport: String,
  },
  setup(props, { slots }) {
    const dropdownRef = ref<HTMLDivElement>()
    const { width, height } = useResize()

    const setPosition = () => {
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
    }

    watch(() => props.visible, setPosition)
    watch([width, height], setPosition, { immediate: true })

    return () => (
      <Teleport to={props.teleport}>
        <div class="fect-select__dropdown" ref={dropdownRef} v-show={props.visible}>
          {slots.default?.()}
        </div>
      </Teleport>
    )
  },
})

export default SelectDropDown
