import { computed, ref, watch, defineComponent } from 'vue'
import {
  createProvider,
  useClickAway,
  useEventListener,
} from '@fect-ui/vue-hooks'
import {
  createName,
  useState,
  useExpose,
  CustomCSSProperties,
  ComponentInstance,
  NormalSizes,
} from '../utils'
import SelectIcon from './select-icon'
import SelcetClearableIcon from './select-clear-icon'
import SelectMultiple from './select-multiple'
import SelectDropDown from './select-dropdown'
import { props } from './props'
import { READONLY_SELECT_KEY, SizeStyle } from './type'
import './index.less'

const name = createName('Select')

const querySelectSize = (size: NormalSizes) => {
  const sizes: Record<NormalSizes, SizeStyle> = {
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
  return sizes[size] || sizes['medium']
}

export default defineComponent({
  name,
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const selectRef = ref<HTMLDivElement>()

    const parent = createProvider<ComponentInstance>(READONLY_SELECT_KEY)
    const { provider, children } = parent

    const [value, setValue] = useState<string | string[]>(props.modelValue)
    const [visible, setVisible] = useState<boolean>(false)
    const [clean, setClean] = useState<boolean>(false)
    const [teleport, setTeleport] = useState<string>('body')

    const empty = computed(() => !props.modelValue)

    const cleanHandler = (e: Event, status: boolean) => {
      e.stopPropagation()
      e.preventDefault()
      setClean(status)
    }

    useEventListener('mouseenter', (e) => cleanHandler(e, true), {
      target: selectRef,
    })
    useEventListener('mouseleave', (e) => cleanHandler(e, false), {
      target: selectRef,
    })

    useClickAway(() => setVisible(false), selectRef, {
      event: 'click',
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

    /**
     * may click delete when the drop-down box appears
     */
    const clearIconHandler = () => {
      setVisible(false)
      setValue('')
    }

    const setParentValue = (val: string) => {
      const { modelValue, multiple } = props
      if (!multiple) return setValue(val)
      let prelist
      prelist = modelValue.slice() as string[]
      const exist = prelist.indexOf(val as string) !== -1
      if (exist) prelist = prelist.filter((v) => v !== val)
      if (!exist) prelist.push(val as string)
      setValue(prelist)
    }

    provider({ setVisible, setParentValue })

    const clickHandler = (e: Event) => {
      if (props.disabled) return
      e.stopPropagation()
      e.preventDefault()
      setVisible(!visible.value)
    }

    watch(value, (cur) => emit('update:modelValue', cur))

    watch(value, (cur) => emit('change', cur))

    const queryChecked = computed(() => {
      const list = [...props.modelValue]
      return children.filter((child) => list.includes(child.value))
    })

    /**
     * control show main context
     */
    const renderPlaceHolder = () => (
      <span class="value fect-select__placeholder">{props.placeholder}</span>
    )

    const renderNodes = () => {
      const { multiple, clearable } = props
      const list = queryChecked.value
      if (!multiple) {
        return <span class="value">{list.map((_) => _.label)}</span>
      }
      return list.map((_) => (
        <span class="fect-multiple__container">
          <SelectMultiple
            onClear={() => setParentValue(_.value)}
            clearable={clearable}
          >
            {_.label}
          </SelectMultiple>
        </span>
      ))
    }

    /**
     * control clearable icon dispaly
     */

    const showClose = computed(() => {
      const { clearable, disabled, modelValue, multiple } = props
      return clearable && !disabled && modelValue && !multiple && clean.value
    })

    const renderRightIcon = () => {
      if (showClose.value) {
        return <SelcetClearableIcon onClick={clearIconHandler} />
      }
      const classes = visible.value ? 'click' : ''
      return <SelectIcon class={classes} />
    }

    useExpose({ setTeleport })

    return () => (
      <div
        class={setClass.value}
        ref={selectRef}
        style={setStyle.value}
        onClick={clickHandler}
      >
        {empty.value ? renderPlaceHolder() : renderNodes()}
        <SelectDropDown
          teleport={teleport.value}
          v-slots={slots}
          visible={visible.value}
          parentRef={selectRef.value}
        />
        {renderRightIcon()}
      </div>
    )
  },
})
