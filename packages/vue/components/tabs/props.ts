export const basicProps = {
  title: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    default: ''
  },
  disabled: Boolean
}

export const tabsTitleProps = {
  ...basicProps,
  active: [String, Number]
}

export const tabProps = basicProps

export const tabsProps = {
  active: {
    type: [String, Number],
    default: 0
  },
  hideDivider: Boolean
}
