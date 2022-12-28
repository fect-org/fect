import { computed, ref, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../provider/theme-context'
import { createName, createBem, pickContextProps } from '../utils'
import { useButtonGroupContext } from '../button-group/button-group-context'
import { props } from './props'
import ButtonLoading from './button-loading'
import { getButtonColors, getButtonHoverColors, getButtonDripColor } from './style'
import ButtonDrip from './button-drip'

import './index.less'

const name = createName('Button')
const bem = createBem('fect-button')

export default defineComponent({
  name,
  props,
  emits: ['click'],
  setup(props, { slots, emit }) {
    const scale = useScale()
    const { theme } = useTheme()
    const buttonRef = ref<HTMLButtonElement>()
    const [drapShow, setDrapShow] = useState<boolean>(false)
    const [dripX, setDripX] = useState<number>(0)
    const [dripY, setDripY] = useState<number>(0)

    const { context } = useButtonGroupContext()

    const showDrip = computed(() => {
      const { shadow, ghost, effect } = props
      return !shadow && !ghost && effect
    })

    const padding = computed(() => {
      const { SCALES } = scale
      if (props.auto) return [SCALES.pl(1.15), SCALES.pr(1.15)]
      return [SCALES.pl(1.375), SCALES.pr(1.375)]
    })

    const hover = computed(() => getButtonHoverColors(theme.value.palette, filterPropsWithButtonGroup.value))

    const colors = computed(() => getButtonColors(theme.value.palette, filterPropsWithButtonGroup.value))

    const dripColor = computed(() => getButtonDripColor(theme.value.palette, props))

    const setCssVariables = computed(() => {
      const { SCALES } = scale
      const [pl, pr] = padding.value
      const { color, bg, border } = colors.value
      const { bg: hoverBg, border: hoverBorder, color: hoverColor } = hover.value
      const { layout, expressiveness } = theme.value
      return {
        '--button-height': SCALES.height(2.5),
        '--button-min-width': SCALES.width(10.5),
        '--button-radius': layout.radius,
        '--button-font-size': SCALES.font(0.875),
        '--button-shadow': expressiveness.shadowSmall,
        '--button-shadow-hover': expressiveness.shadowMedium,
        '--button-pt': SCALES.pt(0),
        '--button-pr': pr,
        '--button-pb': SCALES.pb(0),
        '--button-pl': pl,
        '--button-mt': SCALES.mt(0),
        '--button-mr': SCALES.mr(0),
        '--button-mb': SCALES.mb(0),
        '--button-ml': SCALES.ml(0),
        '--button-bg-color': bg,
        '--button-border-color': border,
        '--button-color': color,
        '--button-hover-bg-color': hoverBg,
        '--button-hover-border-color': hoverBorder,
        '--button-hover-color': hoverColor
      }
    })

    const clickHandler = (e: MouseEvent) => {
      const { disabled, loading } = filterPropsWithButtonGroup.value
      if (disabled || loading) return
      if (showDrip.value && buttonRef.value) {
        setDrapShow(true)
        const rect = buttonRef.value.getBoundingClientRect()
        setDripX(e.clientX - rect.left)
        setDripY(e.clientY - rect.top)
      }
      emit('click', e)
    }

    const filterPropsWithButtonGroup = computed(() => {
      const { shadow, loading, auto, type, disabled, ghost } = props
      const behavior = pickContextProps({ shadow, loading, auto, type, disabled, ghost }, context)
      if (!context) return { ...behavior, auto }
      return { ...behavior, auto: true }
    })

    const setButtonClasses = computed(() => {
      const state = filterPropsWithButtonGroup.value
      return bem(null, state)
    })

    const dripCompleteHandler = () => {
      setDrapShow(false)
      setDripX(0)
      setDripY(0)
    }

    const renderContext = () => {
      const { icon, default: context } = slots
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
        style={setCssVariables.value}
        type={props.htmlType}
        onClick={clickHandler}
      >
        {props.loading && <ButtonLoading loadType={props.loadType} color={colors.value.color} />}
        {drapShow.value && (
          <ButtonDrip color={dripColor.value} x={dripX.value} y={dripY.value} onCompleted={dripCompleteHandler} />
        )}
        {renderContext()}
      </button>
    )
  }
})
