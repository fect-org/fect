import { computed, ref } from 'vue'
import { createNameSpace, useState } from '../utils'
import { CustomCSSProperties } from '../utils/base'
import { props } from './props'
import ButtonLoading from './button-loading'
import ButtonDrip from './button-drip'
import { queryHoverColor } from './style'

import './index.less'
import ButtonIcon from './button-icon'
const [createComponent] = createNameSpace('Button')

type Icon = keyof HTMLElementTagNameMap

export default createComponent({
  props,
  emits: ['click'],
  setup(props, { slots, emit }) {
    const buttonRef = ref<HTMLButtonElement>()
    const [drapShow, setDrapShow] = useState<boolean>(false)
    const [drapX, setDrapX] = useState<number>(0)
    const [drapY, setDrapY] = useState<number>(0)

    const clickHandler = (e: MouseEvent) => {
      const { disabled, loading, shadow, ghost, effect } = props
      if (disabled || loading) return
      const showDrip = !shadow && !ghost && effect
      if (showDrip) {
        setDrapShow(true)
        const rect = buttonRef.value?.getBoundingClientRect()!
        setDrapX(e.clientX - rect.left)
        setDrapY(e.clientY - rect.top)
      }
      emit('click', e)
    }

    /**
     * set ghost disabled shadow className
     */
    const setButtonStatus = computed(() => {
      const { ghost, disabled, shadow, auto, loading } = props
      const names = []
      disabled && names.push('is-disabled')
      ghost && names.push('is-ghost')
      shadow && names.push('is-shadow')
      auto && names.push('is-auto')
      loading && names.push('is-loading')
      return names.join(' ')
    })

    const setStyle = computed(() => {
      const { type, ghost } = props
      const { bg, border, color } = queryHoverColor(type, ghost)
      const style: CustomCSSProperties = {
        '--button-hover-bg': bg,
        '--button-hover-border': border,
        '--button-hover-color': color,
      }
      return style
    })

    const dripCompleteHandler = () => {
      setTimeout(() => {
        setDrapShow(false)
        setDrapX(0)
        setDrapY(0)
      }, 500)
    }

    return () => (
      <button
        class={`fect-button fect-button--${props.type} fect-button--${props.size} ${setButtonStatus.value}`}
        ref={buttonRef}
        style={setStyle.value}
        onClick={clickHandler}
      >
        {props.loading && <ButtonLoading loadType={props.loadType} />}
        {drapShow.value && (
          <ButtonDrip
            x={drapX.value}
            y={drapY.value}
            onCompleted={dripCompleteHandler}
          />
        )}
        {props.icon && <ButtonIcon icon={props.icon as Icon} />}
        {slots.default?.()}
      </button>
    )
  },
})
