import { createNameSpace, theme, validator, createProvider } from '../utils'
const [createComponent] = createNameSpace('BadgeAnchor')
import './badgeAnchor.less'

const READONLY_BADGE_ANCHOR_KEY = 'badgeAnchorKey'

const { placeTypes } = theme

const getTransform = (placement) => {
  const styles = {
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

export default createComponent({
  props: {
    placement: {
      type: String,
      default: 'topRight',
      validator: validator.enums(placeTypes),
    },
  },
  setup(props, { attrs, slots, emit }) {
    const { provider } = createProvider(READONLY_BADGE_ANCHOR_KEY)
    provider(getTransform(props.placement))
    return () => (
      <>
        <div {...attrs} class="fect-badge_anchor">
          {slots.default?.()}
        </div>
      </>
    )
  },
})
