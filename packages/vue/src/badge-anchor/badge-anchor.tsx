import { PropType, defineComponent } from 'vue'
import { createName, PlaceTypes, createBem } from '../utils'
import { createBadgeContext } from './badge-context'
import type { TransformStyles } from './interface'

import './index.less'

const name = createName('BadgeAnchor')
const bem = createBem('fect-badge')

export const getTransform = (placement: PlaceTypes): TransformStyles => {
  const styles: { [key in PlaceTypes]: TransformStyles } = {
    topLeft: {
      top: '0',
      left: '0',
      value: 'translate(-50%, -50%)',
      origin: '0% 0%'
    },
    topRight: {
      top: '0',
      right: '0',
      value: 'translate(50%, -50%)',
      origin: '100% 0%'
    },
    bottomLeft: {
      left: '0',
      bottom: '0',
      value: 'translate(-50%, 50%)',
      origin: '0% 100%'
    },
    bottomRight: {
      right: '0',
      bottom: '0',
      value: 'translate(50%, 50%)',
      origin: '100% 100%'
    }
  }
  return styles[placement]
}

export type BadgeAnchorProvide = TransformStyles

export default defineComponent({
  name,
  props: {
    placement: {
      type: String as PropType<PlaceTypes>,
      default: 'topRight'
    }
  },
  setup(props, { slots }) {
    const { provider } = createBadgeContext()
    provider(getTransform(props.placement))
    return () => <div class={bem('anchor')}>{slots.default?.()}</div>
  }
})
