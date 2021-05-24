import { unref } from 'vue'

// const setDOMRect = (width, height) => {
//   return {
//     top: 0,
//     left: 0,
//     right: width,
//     bottom: height,
//     width,
//     height,
//   }
// }

const useRect = (el) => {
  const element = unref(el)
  const rect = element.getBoundingClientRect()
  return rect
}

export { useRect }
