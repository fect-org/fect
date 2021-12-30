import { computed, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { useAvatarContext } from '../avatar-group/avatar-context'
import { avatarProps } from '../avatar-group/props'
import type { AvatarContext, BehavoirState } from '../avatar-group/interface'
import './index.less'

const name = createName('Avatar')

const getBehaviorState = (behavior: any, extra: AvatarContext | null, prop: BehavoirState) => {
  if (extra && extra.props) return extra.props[prop]
  return behavior
}

export default defineComponent({
  name,
  props: avatarProps,
  setup(props, { attrs }) {
    const [showText] = useState<boolean>(!props.src)

    const { context } = useAvatarContext()

    const safeText = (text: string) => (text.length <= 4 ? text : text.slice(0, 3))

    const setClass = computed(() => {
      const { isSquare, stacked, size } = props
      const names: string[] = []
      const selfSize = getBehaviorState(size, context, 'size')
      const selfStacked = getBehaviorState(stacked, context, 'stacked')
      const selfSquare = getBehaviorState(isSquare, context, 'isSquare')
      names.push(selfSize || 'medium')
      selfSquare && names.push('isSquare')
      selfStacked && names.push('stacked')
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
