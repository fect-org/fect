export const props = {
  prop: String,
  label: String,
  labelWidth: {
    type: [String, Number],
    default: 'initial',
  },
  required: Boolean,
  showMessage: {
    type: Boolean,
    default: true,
  },
  inlineMessage: Boolean,
}
