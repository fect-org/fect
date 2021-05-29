import { computed, ref, watchEffect, toRefs } from 'vue'
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
    multiple: Boolean,
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const selectRef = ref(null)
    const visible = ref(false)
    const isEmpty = ref(false)
    const showClear = ref(false)

    const { provider, children } = createProvider(READONLY_SELECT_KEY)

    const setVisbile = (state) => (visible.value = state)

    const setEmpty = (state) => (isEmpty.value = state)

    const setShowClear = (state) => (showClear.value = state)

    const initIsEmpty = () => {
      const hasValue = !!props.modelValue
      if (hasValue) return setEmpty(false)
      return setEmpty(true)
    }

    useEventListener(
      'mouseenter',
      (e) => {
        e.stopPropagation()
        e.preventDefault()
        setShowClear(true)
      },
      selectRef,
    )
    useEventListener(
      'mouseleave',
      (e) => {
        e.stopPropagation()
        e.preventDefault()
        setShowClear(false)
      },
      selectRef,
    )

    watchEffect(initIsEmpty)

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

    const clearIconHandler = () => {
      setVisbile(false)
      updateModelValue('')
    }

    const updateModelValue = (value) => emit('update:modelValue', value)

    const setChange = (value) => emit('change', value)

    // useEventListener('click', () => setVisbile(false))

    /**
     * filter and collect checked label array
     */
    const queryChecked = computed(() =>
      children.filter((child) => child.value === props.modelValue),
    )

    /**
     *  Display control right icon in singleMode
     */

    const rightVisible = computed(() => {
      const { clearable, disabled, modelValue } = props
      const show = clearable && !disabled && modelValue && showClear.value
      return show
    })

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
          {queryChecked.value.map((child) => (
            <SelectMultiple>{child.label}</SelectMultiple>
          ))}
        </span>
      )
    }

    const renderMultipleMode = () => {
      return <div>1</div>
    }

    return () => (
      <div
        class={`fect-select ${props.disabled ? 'disabled' : ''}`}
        ref={selectRef}
        style={setStyle.value}
        onClick={handleClick}
      >
        {isEmpty.value && renderPlaceHolder()}
        {!isEmpty.value && renderSingleMode()}
        <SelectDropDown v-slots={slots} />
        {!rightVisible.value && (
          <SelectIcon className={visible.value ? 'click' : ''} />
        )}
        {rightVisible.value && (
          <SelcetClearableIcon
            disabled={props.disabled}
            onClick={clearIconHandler}
          />
        )}
      </div>
    )
  },
})
