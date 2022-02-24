import { defineComponent } from 'vue'

/**
 * Keep the logic and wait for the next tooltip
 * optimization to remove comments
 */

// const getRect = (Parentref: ElementRef, ref: ElementRef) => {
//   const parentRect = getDomRect(Parentref)
//   const { height } = getDomRect(ref)
//   const scrollElement = document.documentElement
//   const visibleHeight = scrollElement.clientHeight
//   const parentElHeight = parentRect.height
//   const offset = visibleHeight - parentRect.bottom
//   // when visibleHeight reduce parent rect bottom can get screen bottom value
//   const position = offset > height
//   const baseTop = parentRect.bottom + scrollElement.scrollTop
//   const top = position ? baseTop : baseTop - parentElHeight - height - 5
//   return {
//     ...parentRect,
//     width: parentRect.width || parentRect.right - parentRect.left,
//     top,
//     left: parentRect.left + scrollElement.scrollLeft
//   }
// }

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%'
    }
  },
  setup(props, { slots }) {
    return () => <div style={{ width: props.width }}>{slots.default?.()}</div>
  }
})
