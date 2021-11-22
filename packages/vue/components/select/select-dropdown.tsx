import { defineComponent, ref, Teleport, watch, Ref, PropType } from 'vue'
import { getDomRect, useResize } from '../utils'

type ElementRef = Element | Ref<Element | undefined>

const getRect = (Parentref: ElementRef, ref: ElementRef) => {
  const parentRect = getDomRect(Parentref)
  const { height } = getDomRect(ref)
  const scrollElement = document.documentElement
  const visibleHeight = scrollElement.clientHeight
  const parentElHeight = parentRect.height
  const offset = visibleHeight - parentRect.bottom
  // when visibleHeight reduce parent rect bottom can get screen bottom value
  const position = offset > height
  const baseTop = parentRect.bottom + scrollElement.scrollTop
  const top = position ? baseTop : baseTop - parentElHeight - height - 5
  return {
    ...parentRect,
    width: parentRect.width || parentRect.right - parentRect.left,
    top,
    left: parentRect.left + scrollElement.scrollLeft,
  }
}

const SelectDropDown = defineComponent({
  props: {
    visible: Boolean,
    parentRef: {
      type: Object as PropType<HTMLDivElement>,
    },
    teleport: String,
  },
  setup(props, { slots }) {
    const dropdownRef = ref<HTMLDivElement>()
    const { width, height } = useResize()

    const setPosition = () => {
      if (props.parentRef && dropdownRef.value) {
        const { width, top, left } = getRect(props.parentRef, dropdownRef)
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
        <div
          class="fect-select__dropdown"
          ref={dropdownRef}
          style={{ visibility: props.visible ? 'visible' : 'hidden' }}
        >
          {slots.default?.()}
        </div>
      </Teleport>
    )
  },
})

export default SelectDropDown
