import { computed, ref, watchEffect, toRefs, watch } from 'vue'
import {
  createNameSpace,
  createProvider,
  theme,
  validator,
  mountRender,
  useRect,
} from '../utils'
import SelectIcon from './select-icon'
import SelectDropDown from './select-dropdown'
import './select.less'

const [createComponent] = createNameSpace('Select')

const { initMountArea } = mountRender
const { tuple, normalSizes } = theme

const READONLY_SELECT_KEY = 'selectKey'

const querySelectSize = (size) => {
  const sizes = {
    mini: {
      height: 'calc(1 * var(--fay-gap))',
      fontSize: '12px',
      minWidth: '100px',
    },
    small: {
      height: 'calc(1.35 * var(--fay-gap))',
      fontSize: '12px',
      minWidth: '128px',
    },
    medium: {
      height: 'calc(1.688 * var(--fay-gap))',
      fontSize: '14px',
      minWidth: '160px',
    },
    large: {
      height: 'calc(1.688 * var(--fay-gap))',
      fontSize: '16px',
      minWidth: '200px',
    },
  }
  return sizes[size]
}

initMountArea('fect-select__option-wrapper')

export default createComponent({
  props: {
    modelValue: {
      type: [String],
      default: '',
    },
    placeholder: {
      type: [String],
      default: '',
    },
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    width: {
      type: String,
      default: 'initial',
    },
  },
  emits: ['change'],
  setup(props, { attrs, slots, emit }) {
    const IsArr = Array.isArray(props.modelValue)
    const visible = ref(false)
    const isEmpty = ref(false)
    const selectRef = ref(false)
    const renderSelect = () => selectRef.value
    /**
     * Automatic detection modelValue to jug selection mode
     */
    const mutiple = ref(false)

    const { provider } = createProvider(READONLY_SELECT_KEY)
    provider({
      ...toRefs(props),
      renderSelect,
      visible,
    })

    const setVisbile = (state) => (visible.value = state)

    const setEmpty = (state) => (isEmpty.value = state)

    const setMutiple = (state) => (mutiple.value = state)

    const initIsEmpty = () => {
      const hasValue = !!props.modelValue
      console.log(hasValue)
      if (IsArr && props.modelValue.length > 0) return setEmpty(false)
      if (hasValue) return setEmpty(false)
      return setEmpty(true)
    }

    watchEffect(() => {
      initIsEmpty()
    })

    /**
     * use computed to set global css variable
     * In previous version . It use watchEffect to set style and
     * save in reactive . it's too trouble ,too stupid.
     */
    const setStyle = computed(() => {
      const { height, fontSize, minWidth } = querySelectSize(props.size)
      const style = {}
      style['--select-fontSize'] = fontSize
      style['--select-minWidth'] = minWidth
      style['--select-height'] = height
      style.width = props.width
      return style
    })

    const handleClick = (e) => {
      if (props.disabled) return
      e.stopPropagation()
      e.preventDefault()
      const show = visible.value
      setVisbile(!show)
    }

    const renderPlaceHolder = () => {
      return (
        <span class="value fect-select__placeholder">{props.placeholder}</span>
      )
    }

    const renderSingleMode = () => {
      return <span class="value">{props.modelValue}</span>
    }

    return () => (
      <div
        class={`fect-select ${props.disabled ? 'disabled' : ''}`}
        ref={selectRef}
        style={setStyle.value}
        onClick={handleClick}
      >
        {isEmpty.value && renderPlaceHolder()}
        {renderSingleMode()}
        <SelectDropDown v-slots={slots} />
        <SelectIcon className={visible.value ? 'click' : ''} />
      </div>
    )
  },
})
