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
      type: [String, Array],
      default: '',
    },
    placeholder: {
      type: String,
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

    const selectValue = ref(props.modelValue)

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

    const updateModelValue = (val) => {
      if (props.multiple) {
        const value = selectValue.value.slice()
        const index = value.indexOf(val)
        if (index !== -1) {
          value.splice(index, 1)
        } else {
          value.push(val)
        }
        selectValue.value = value
        return emit('update:modelValue', selectValue.value)
      }
      emit('update:modelValue', val)
    }

    const setChange = (value) => emit('change', value)

    useEventListener('click', () => setVisbile(false))

    /**
     * filter and collect checked label array
     */
    const queryChecked = computed(() => {
      return children.filter((child) => {
        if ([...props.modelValue].includes(child.value)) return child
      })
    })

    /**
     *  Display control right icon in singleMode
     */

    const rightVisible = computed(() => {
      const { clearable, disabled, modelValue, multiple } = props
      const show
        = clearable && !disabled && modelValue && showClear.value && !multiple
      return show
    })

    watch(selectValue, (pre) => setChange(pre))

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

    const renderNodes = () => {
      return (
        <span
          class={`${props.multiple ? 'fect-multiple__container' : 'value'} `}
        >
          {queryChecked.value.map((child) => (
            <>
              {props.multiple && (
                <SelectMultiple
                  onClear={() => updateModelValue(child.value)}
                  clearable={props.clearable}
                >
                  {child.label}
                </SelectMultiple>
              )}
              {!props.multiple && child.label}
            </>
          ))}
        </span>
      )
    }

    return () => (
      <div
        class={`fect-select ${props.disabled ? 'disabled' : ''} ${
          props.multiple ? 'multiple' : ''
        }`}
        ref={selectRef}
        style={setStyle.value}
        onClick={handleClick}
      >
        {isEmpty.value && renderPlaceHolder()}
        {!isEmpty.value && renderNodes()}
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
