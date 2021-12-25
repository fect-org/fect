import { computed, defineComponent } from 'vue'
import { useState, useProvider } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { READONLY_AVATAR_KEY, AvatarGroupProvide } from '../avatar-group/type'
import { AvatarProps } from '../avatar-group/props'
import { isBoolean } from '../utils'
import './index.less'

const name = createName('Avatar')

export default defineComponent({
  name,
  props: AvatarProps,
  setup(props, { attrs }) {
    const [showText] = useState<boolean>(!props.src)

    const { context } = useProvider<AvatarGroupProvide>(READONLY_AVATAR_KEY)

    const safeText = (text: string) => (text.length <= 4 ? text : text.slice(0, 3))

    const selfSize = computed(() => {
      if (context) {
        return props.size || context.props.size
      }
      return props.size || 'medium'
    })

    const selfStacked = computed(() => {
      if (isBoolean(props.stacked)) {
        return props.stacked
      }
      return (context && context.props.stacked) || false
    })

    const selfIsSquare = computed(() => {
      if (isBoolean(props.isSquare)) {
        return props.isSquare
      }
      return (context && context.props.isSquare) || false
    })

    const setClass = computed(() => {
      const names: string[] = [selfSize.value as string]
      selfIsSquare.value && names.push('isSquare')
      selfStacked.value && names.push('stacked')
      return names.join(' ')
    })

    return () => (
      <div class={`fect-avatar ${setClass.value} ${props.className || ''}`.trim()}>
        {!showText.value && <img src={props.src} draggable="false" alt={props.alt} {...attrs} />}
        {showText.value && (
          <span class={'fect-avatar-text '} {...attrs}>
            {safeText(props.text)}
          </span>
        )}
      </div>
    )
  }
})
