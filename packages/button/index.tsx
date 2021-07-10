import { computed, ref, PropType } from 'vue'
import { createNameSpace } from '../utils'
import {
  ButtonTypes,
  LoadingTypes,
  NormalSizes,
} from '../utils/theme/propTypes'
import ButtonDrip from './button-drip'
import ButtonLoading from './button-loading'
import './index.less'

const [createComponent] = createNameSpace('Button')

export default createComponent({
  props: {
    type: {
      type: String as PropType<ButtonTypes>,
      default: 'default',
    },
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    disabled: Boolean,
    shadow: Boolean,
    loading: Boolean,
    auto: Boolean,
    loadType: {
      type: String as PropType<LoadingTypes>,
      default: 'deafult',
    },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const buttonRef = ref<HTMLButtonElement>()
    const drapShow = ref<boolean>(false) // control drap component display
    const drapX = ref<number>(0)
    const drapY = ref<number>(0)

    const setClass = computed(() => {
      const names: string[] = []
      props.loading && names.push('loading')
      props.shadow && names.push('shadow')
      props.disabled && names.push('disabled')
      props.auto && names.push('auto')
      props.type && names.push(props.type)
      props.size && names.push(props.size)
      return names.join(' ')
    })

    const clickHandler = (e: MouseEvent) => {
      // hide drip when button in shadow status
      if (props.disabled || props.loading) return
      const showDrip = !props.shadow
      if (showDrip) {
        const rect = buttonRef.value?.getBoundingClientRect()
        drapShow.value = true
        drapX.value = e.clientX - rect!.left
        drapY.value = e.clientY - rect!.top
        emit('click', e)
      }
    }

    const dripCompleteHandler = () => {
      setTimeout(() => {
        drapShow.value = false
        drapX.value = 0
        drapY.value = 0
      }, 500)
    }

    return () => (
      <button
        disabled={props.disabled}
        class={`fect-btn ${setClass.value}`}
        ref={buttonRef}
        onClick={clickHandler}
      >
        {/* color={props.type} */}
        {props.loading && <ButtonLoading loadType={props.loadType} />}
        {drapShow.value && (
          <ButtonDrip
            x={drapX.value}
            y={drapY.value}
            onCompleted={dripCompleteHandler}
          />
        )}
        {slots.default?.()}
      </button>
    )
  },
})
