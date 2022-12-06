/**
 * After ver 1.5.3 . BackDrop component will replace Teleport as internal
 * component. I don't wann to expose it as public component. (So i don't provide documents.)
 */

export const props = {
  visible: Boolean,
  layerClassName: {
    type: String,
    default: ''
  },
  contentClassName: {
    type: String,
    default: ''
  }
}
