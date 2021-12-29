import { computed, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { useAvatarContext } from '../avatar-group/avatar-context'
import { avatarProps } from '../avatar-group/props'
import { PropFn } from '../avatar-group/interface'
import { isBoolean } from '../utils'
import './index.less'

const name = createName('Avatar')

export default defineComponent({
  name,
  props: avatarProps,
  setup(props, { attrs }) {
    const [showText] = useState<boolean>(!props.src)

    const { context } = useAvatarContext()

    const safeText = (text: string) => (text.length <= 4 ? text : text.slice(0, 3))

    const selfSize = computed(() => {
      if (context) {
        return props.size || context.props.size
      }
      return props.size || 'medium'
    })

    const setSelfProp: PropFn = (prop) => {
      if (isBoolean(props[prop])) {
        return props[prop]
      }
      return (context && context.props[prop]) || false
    }

    const setClass = computed(() => {
      const names: string[] = [selfSize.value]
      setSelfProp('isSquare') && names.push('isSquare')
      setSelfProp('stacked') && names.push('stacked')
      return names.join(' ')
    })

    return () => (
      <div class={`fect-avatar ${setClass.value} ${props.className || ''}`}>
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
