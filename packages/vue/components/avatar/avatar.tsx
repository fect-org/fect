import { computed, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem, pickContextProps } from '../utils'
import { useAvatarContext } from '../avatar-group/avatar-context'
import { avatarProps } from '../avatar-group/props'

import './index.less'

const name = createName('Avatar')
const bem = createBem('fect-avatar')

export default defineComponent({
  name,
  props: avatarProps,
  setup(props, { attrs }) {
    const [showText] = useState<boolean>(!props.src)

    const { context } = useAvatarContext()

    const safeText = (text: string) => (text.length <= 4 ? text : text.slice(0, 3))

    const setClass = computed(() => {
      const { stacked, size, isSquare } = props
      const behavior = pickContextProps({ stacked, size, isSquare }, context)
      return bem(null, behavior)
    })

    return () => (
      <div class={`${setClass.value} ${props.className || ''}`}>
        {!showText.value && <img src={props.src} draggable="false" alt={props.alt} {...attrs} />}
        {showText.value && (
          <span class={bem('text')} {...attrs}>
            {safeText(props.text)}
          </span>
        )}
      </div>
    )
  }
})
