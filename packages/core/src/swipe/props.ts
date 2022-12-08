export const props = {
  duration: {
    type: [Number, String],
    default: 300
  },
  autoplay: {
    type: [Number],
    default: 0
  },
  loop: {
    type: Boolean,
    default: true
  },
  initialValue: {
    type: [Number, String],
    default: 0
  },
  indicatorSize: {
    type: String,
    default: '8px'
  },
  indicatorDisplay: {
    type: Boolean,
    default: true
  },
  indicatorColor: String
}
