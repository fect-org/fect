import { computed, ref, watchEffect, toRefs, watch } from 'vue'
import {
  createNameSpace,
  createProvider,
  theme,
  validator,
  useEventListener,
} from '../utils'
import SelectMultiple from './select-multiple'
import SelectIcon from './select-icon'
import SelcetClearableIcon from './select-icon-clear'
import SelectDropDown from './select-dropdown'
import './select.less'

const [createComponent] = createNameSpace('Select')

const { normalSizes } = theme

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
  emits: ['change', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const IsArr = Array.isArray(props.modelValue)
    const visible = ref(false)
    const isEmpty = ref(false)
    const selectRef = ref(null)

    /**
     * Automatic detection modelValue to jug selection mode
     */
    const mutiple = ref(false)

    const { provider, children } = createProvider(READONLY_SELECT_KEY)

    const setVisbile = (state) => (visible.value = state)

    const setEmpty = (state) => (isEmpty.value = state)

    const setMutiple = (state) => (mutiple.value = state)

    const initIsEmpty = () => {
      const hasValue = !!props.modelValue
      if (IsArr && props.modelValue.length > 0) return setEmpty(false)
      if (hasValue) return setEmpty(false)
      return setEmpty(true)
    }

    const initMutiple = () => {
      if (IsArr && props.modelValue.length > 0) return setMutiple(true)
    }

    watchEffect(() => {
      initIsEmpty()
      initMutiple()
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

    const updateModelValue = (value) => emit('update:modelValue', value)

    const setChange = (value) => emit('change', value)
    useEventListener('click', () => setVisbile(false))

    provider({
      ...toRefs(props),
      selectRef,
      visible,
      setVisbile,
      setChange,
      updateModelValue,
    })

    const renderPlaceHolder = () => {
      return (
        <span class="value fect-select__placeholder">{props.placeholder}</span>
      )
    }

    const renderSingleMode = () => {
      return (
        <span class="value" style="justify-content: space-between">
          {children.map((child) => {
            if (child.value === props.modelValue) {
              return (
                <>
                  <SelectMultiple>{child.label}</SelectMultiple>
                  {props.clearable && !props.disabled && (
                    <SelcetClearableIcon
                      style="margin-right:5px"
                      disabled={props.disabled}
                      onClick={() => updateModelValue('')}
                    />
                  )}
                </>
              )
            }
          })}
        </span>
      )
    }

    return () => (
      <div
        class={`fect-select ${props.disabled ? 'disabled' : ''}`}
        ref={selectRef}
        style={setStyle.value}
        onClick={handleClick}
      >
        {isEmpty.value && renderPlaceHolder()}
        {!isEmpty.value && !mutiple.value && renderSingleMode()}
        <SelectDropDown v-slots={slots} />
        <SelectIcon className={visible.value ? 'click' : ''} />
      </div>
    )
  },
})
