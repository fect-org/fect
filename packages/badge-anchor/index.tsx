import { PropType } from 'vue'
import { createNameSpace } from '../utils'
import { createProvider } from '@fect-ui/vue-hooks'
import { PlaceTypes } from '../utils/theme/propTypes'

import './index.less'

const [createComponent] = createNameSpace('BadgeAnchor')

export const READONLY_BADGE_ANCHOR_KEY = 'badgeAnchorKey'

export type TransformStyles = {
  top?: string
  bottom?: string
  left?: string
  right?: string
  value: string
  origin: string
}

export const getTransform = (placement: PlaceTypes): TransformStyles => {
  const styles: { [key in PlaceTypes]: TransformStyles } = {
    topLeft: {
      top: '0',
      left: '0',
      value: 'translate(-50%, -50%)',
      origin: '0% 0%',
    },
    topRight: {
      top: '0',
      right: '0',
      value: 'translate(50%, -50%)',
      origin: '100% 0%',
    },
    bottomLeft: {
      left: '0',
      bottom: '0',
      value: 'translate(-50%, 50%)',
      origin: '0% 100%',
    },
    bottomRight: {
      right: '0',
      bottom: '0',
      value: 'translate(50%, 50%)',
      origin: '100% 100%',
    },
  }
  return styles[placement]
}

export type BadgeAnchorProvide = TransformStyles

export default createComponent({
  props: {
    placement: {
      type: String as PropType<PlaceTypes>,
      default: 'topRight',
    },
  },
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_BADGE_ANCHOR_KEY)
    provider(getTransform(props.placement))
    return () => <div class="fect-badge_anchor">{slots.default?.()}</div>
  },
})
