import { computed, ref, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem, pickContextProps } from '../utils'
import { props } from './props'
import ButtonLoading from './button-loading'
import { useButtonGroupContext } from '../button-group/button-group-context'
import ButtonDrip from './button-drip'
import { queryHoverColor } from './style'

import type { CSSProperties } from '../utils'

import './index.less'

const name = createName('Button')
const bem = createBem('fect-button')

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

    const showDrip = computed(() => {
      const { shadow, ghost, effect } = props
      return !shadow && !ghost && effect
    })

    const clickHandler = (e: MouseEvent) => {
      const { disabled, loading } = props
      if (disabled || loading) return
      if (showDrip.value && buttonRef.value) {
        setDrapShow(true)
        const rect = buttonRef.value.getBoundingClientRect()
        setDrapX(e.clientX - rect.left)
        setDrapY(e.clientY - rect.top)
      }
      emit('click', e)
    }

    const setButtonClasses = computed(() => {
      const { ghost, disabled, shadow, loading, type, auto, size } = props
      const behavior = pickContextProps({ auto, size }, context)

      return bem(null, [type, { ghost, disabled, shadow, loading, ...behavior }])
    })

    const setStyle = computed(() => {
      const { type, ghost } = props
      const { bg, border, color } = queryHoverColor(type, ghost)
      const style: CSSProperties = {
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
            <div class={bem('icon')} style={{ left: offsetStyle, transform: translateStyle }}>
              {icon()}
            </div>
            {context && <div class={bem('text')}>{context()}</div>}
          </>
        )
      }
      return slots.default?.()
    }

    return () => (
      <button
        class={setButtonClasses.value}
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
