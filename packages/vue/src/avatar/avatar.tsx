import { computed, defineComponent } from 'vue'
import { createName, createBem, pickContextProps } from '../utils'
import { useAvatarContext } from '../avatar-group/avatar-context'
import { avatarProps } from '../avatar-group/props'

import './index.less'

const name = createName('Avatar')
const bem = createBem('fect-avatar')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: avatarProps,
  setup(props, { attrs }) {
    const { context } = useAvatarContext()

    const safeText = (text: string) => (text.length <= 4 ? text : text.slice(0, 3))

    const setAvatarClasses = computed(() => {
      const { stacked, size, isSquare, className } = props
      const behavior = pickContextProps({ stacked, size, isSquare }, context)
      return `${bem(null, behavior)} ${className}`
    })

    return () => (
      <div class={setAvatarClasses.value}>
        {props.src && <img src={props.src} draggable="false" alt={props.alt} {...attrs} />}
        {!props.src && (
          <span class={bem('text')} {...attrs}>
            {safeText(props.text)}
          </span>
        )}
      </div>
    )
  }
})
