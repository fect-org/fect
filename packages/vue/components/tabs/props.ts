import type { PropType } from 'vue'
import type { TabsHighlightRect, TabsHoverRatio } from './interface'

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
  active: Boolean
}

export const tabProps = basicProps

export const tabsProps = {
  active: {
    type: [String, Number],
    default: 0
  },
  hideDivider: Boolean,
  hoverRatio: {
    type: Object as PropType<TabsHoverRatio>,
    default: {
      w: 1.15,
      h: 0.7
    }
  }
}

export const tabsHighlightProps = {
  active: Boolean,
  rect: {
    type: Object as PropType<TabsHighlightRect>
  }
}
