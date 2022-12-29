import { computed, defineComponent } from 'vue'
import { createName, createBem } from '../utils'
import { createBadgeContext } from './badge-context'
import type { PropType } from 'vue'
import type { TransformStyles, BadgeAnchorTypes } from './interface'

import './index.less'

const name = createName('BadgeAnchor')
const bem = createBem('fect-badge')

export const getTransform = (placement: BadgeAnchorTypes): TransformStyles => {
  const styles: { [key in BadgeAnchorTypes]: TransformStyles } = {
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
      type: String as PropType<BadgeAnchorTypes>,
      default: 'topRight'
    }
  },
  setup(props, { slots }) {
    const transform = computed(() => getTransform(props.placement))

    const { provider } = createBadgeContext()
    provider({ transform })
    return () => <div class={bem('anchor')}>{slots.default?.()}</div>
  }
})
