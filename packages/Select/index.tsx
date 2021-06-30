import { computed, PropType, ref, watchEffect } from 'vue'
import {
  createProvider,
  useClickAway,
  useEventListener,
} from '@fect-ui/vue-hooks'
import { createNameSpace } from '../utils'
import { NormalSizes } from '../utils/theme/propTypes'
import { CustomCSSProperties, ComponentInstance } from '../utils/base'
import SelectIcon from './select-icon'
import SelcetClearableIcon from './select-clear-icon'
import SelectMultiple from './select-multiple'
import SelectDropDown from './select-dropdown'
import './select.less'

const [createComponent] = createNameSpace('Select')

export const READONLY_SELECT_KEY = 'selectKey'

interface SelectEvent {
  target: {
    value: string
  }
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: Event
}

export type SelectProvide = {
  setVisible: (status: boolean) => void
  updateModelValue: (value: string) => void
  setChange: (event: SelectEvent) => void
}

type SizeStyle = {
  height: string
  fontSize: string
  minWidth: string
}

const querySelectSize = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: SizeStyle } = {
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
      type: [Array, String],
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiple: Boolean,
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    width: {
      type: String,
      default: 'initial',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const { provider, children } = createProvider<ComponentInstance>(
      READONLY_SELECT_KEY,
    )
    const selectRef = ref<HTMLDivElement>()
    const visible = ref<boolean>(false)
    const isEmpty = ref<boolean>(false)
    const showClear = ref(false)

    const setVisible = (cur: boolean) => (visible.value = cur)
    const setEmpty = (cur: boolean) => (isEmpty.value = cur)
    const setShowClear = (state: boolean) => (showClear.value = state)

    useEventListener(
      'mouseenter',
      (e: Event) => {
        e.stopPropagation()
        e.preventDefault()
        setShowClear(true)
      },
      { target: selectRef },
    )
    useEventListener(
      'mouseleave',
      (e: Event) => {
        e.stopPropagation()
        e.preventDefault()
        setShowClear(false)
      },
      { target: selectRef },
    )

    useClickAway(() => setVisible(false), selectRef, {
      event: 'click',
    })

    /**
     * isEmpty only work in modelvalue as empty
     */
    watchEffect(() => {
      const hasValue = !!props.modelValue
      setEmpty(hasValue ? false : true)
    })

    const setStyle = computed(() => {
      const { height, fontSize, minWidth } = querySelectSize(props.size)
      return {
        ['--select-minWidth']: minWidth,
        ['--select-height']: height,
        ['--select-fontSize']: fontSize,
      } as CustomCSSProperties
    })

    const setClass = computed(() => {
      const { multiple, disabled } = props
      const names: string[] = ['fect-select']
      multiple && names.push('multiple')
      disabled && names.push('disabled')
      return names.join(' ')
    })

    const updateModelValue = (val: string) => {
      const { multiple, modelValue } = props
      if (multiple) {
        const value = modelValue.slice() as Array<string>
        const index = value.indexOf(val)
        if (index !== -1) {
          value.splice(index, 1)
        } else {
          value.push(val)
        }
        return emit('update:modelValue', value)
      }
      emit('update:modelValue', val)
    }

    const queryChecked = computed(() => {
      return children.filter((child: ComponentInstance) => {
        /**
         * user may may pass in null
         */
        if (props.modelValue === null) return
        if ([...props.modelValue].includes(child.value)) return child
      })
    })

    const clearIconHandler = () => {
      setVisible(false)
      updateModelValue('')
    }

    const setChange = (value: SelectEvent) => emit('change', value)

    provider({ updateModelValue, setChange, setVisible })

    const handleClick = (e: Event) => {
      if (props.disabled) return
      e.stopPropagation()
      e.preventDefault()
      const show = visible.value
      setVisible(!show)
    }

    /**
     * control show main context
     */
    const renderPlaceHolder = () => (
      <span class="value fect-select__placeholder">{props.placeholder}</span>
    )

    const renderNodes = () => {
      const classes = (props.multiple && 'fect-multiple__container') || 'value'
      const { multiple, clearable } = props
      return (
        <span class={classes}>
          {queryChecked.value.map((child) => (
            <>
              {multiple ? (
                <SelectMultiple
                  onClear={() => updateModelValue(child.value)}
                  clearable={clearable}
                >
                  {child.label}
                </SelectMultiple>
              ) : (
                child.label
              )}
            </>
          ))}
        </span>
      )
    }

    /**
     * show right icons
     */
    const showRightIcon = computed(() => {
      const { clearable, disabled, modelValue, multiple } = props
      return (
        clearable && !disabled && modelValue && !multiple && showClear.value
      )
    })

    const renderRightIcon = () => {
      if (showRightIcon.value) {
        return <SelcetClearableIcon onClick={clearIconHandler} />
      }
      return <SelectIcon class={(visible.value && 'click') || ''} />
    }

    return () => (
      <div
        class={setClass.value}
        ref={selectRef}
        style={setStyle.value}
        onClick={handleClick}
      >
        {isEmpty.value ? renderPlaceHolder() : renderNodes()}
        <SelectDropDown
          v-slots={slots}
          visible={visible.value}
          parentRef={selectRef.value}
        />
        {renderRightIcon()}
      </div>
    )
  },
})
