import { computed, ref, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, CustomCSSProperties, createBem } from '../utils'
import { props } from './props'
import ButtonLoading from './button-loading'
import { useButtonGroupContext } from '../button-group/button-group-context'
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

    const { context } = useButtonGroupContext()

    const clickHandler = (e: MouseEvent) => {
      const { disabled, loading, shadow, ghost, effect } = props
      if (disabled || loading) return
      const showDrip = !shadow && !ghost && effect
      if (showDrip) {
        setDrapShow(true)
        const rect = buttonRef.value!.getBoundingClientRect()!
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
      loading && names.push('is-loading')

      if (context && context.props.auto) {
        names.push('is-auto')
      } else {
        auto && names.push('is-auto')
      }

      return names.join(' ')
    })

    const setStyle = computed(() => {
      const { type, ghost } = props
      const { bg, border, color } = queryHoverColor(type, ghost)
      const style: CustomCSSProperties = {
        '--button-hover-bg': bg,
        '--button-hover-border': border,
        '--button-hover-color': color
      }
      return style
    })

    const dripCompleteHandler = () => {
      setDrapShow(false)
      setDrapX(0)
      setDrapY(0)
    }

    const renderContext = () => {
      const { icon } = slots
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

    const setButtonState = () => {
      let size = ''
      if (context && context.props.size) {
        ;({ size } = context.props)
      } else {
        ;({ size } = props)
      }
      return createBem('fect-button', size)
    }

    return () => (
      <button
        class={`fect-button ${createBem('fect-button', props.type)} ${setButtonState()} ${setButtonStatus.value}`}
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
  }
})
