import { computed, ref, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, CustomCSSProperties } from '../utils'
import { props } from './props'
import ButtonLoading from './button-loading'
import ButtonDrip from './button-drip'
import { queryHoverColor } from './style'

import './index.less'

const name = createName('Button')

export default defineComponent({
  name,
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
      const timer = setTimeout(() => {
        setDrapShow(false)
        setDrapX(0)
        setDrapY(0)
        clearTimeout(timer)
      }, 500)
    }

    const renderContext = () => {
      const icon = slots['icon']
      const context = slots['default']
      if (icon) {
        const offsetStyle = context ? '15%' : '50%'
        const translateStyle = context ? 'translateY(-50%)' : 'translate(-50%, -50%)'
        return (
          <>
            <div class="fect-button__icon" style={{ left: offsetStyle, transform: translateStyle }}>
              {icon()}
            </div>
            {context && <div class="fect-button__text">{context()}</div>}
          </>
        )
      }
      return slots.default?.()
    }

    return () => (
      <button
        class={`fect-button fect-button--${props.type} fect-button--${props.size} ${setButtonStatus.value}`}
        ref={buttonRef}
        style={setStyle.value}
        type={props.htmlType}
        onClick={clickHandler}
      >
        {props.loading && <ButtonLoading loadType={props.loadType} />}
        {drapShow.value && <ButtonDrip x={drapX.value} y={drapY.value} onCompleted={dripCompleteHandler} />}
        {renderContext()}
      </button>
    )
  },
})
