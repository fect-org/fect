import { computed, ref, watch, defineComponent } from 'vue'
import { useClickAway, useState } from '@fect-ui/vue-hooks'
import { createName, useExpose, CustomCSSProperties, NormalSizes } from '../utils'
import GridGroup from '../grid-group'
import { createSelectContext } from './select-context'
import SelectIcon from './select-icon'
import SelcetClearableIcon from './select-clear-icon'
import SelectMultiple from './select-multiple'
import SelectDropDown from './select-dropdown'
import SeelctInput from './select-input'
import { props } from './props'
import type { SizeStyle } from './interface'

import './index.less'

const name = createName('Select')

export const hasEmpty = (val: any) => {
  if (val === '') return true
  if (Array.isArray(val) && !val.length) return true
  return false
}

const querySelectSize = (size: NormalSizes) => {
  const sizes: Record<NormalSizes, SizeStyle> = {
    mini: {
      height: 'calc(1 * var(--fay-gap))',
      fontSize: '12px',
      minWidth: '100px'
    },
    small: {
      height: 'calc(1.35 * var(--fay-gap))',
      fontSize: '12px',
      minWidth: '128px'
    },
    medium: {
      height: 'calc(1.688 * var(--fay-gap))',
      fontSize: '14px',
      minWidth: '160px'
    },
    large: {
      height: 'calc(1.688 * var(--fay-gap))',
      fontSize: '16px',
      minWidth: '200px'
    }
  }
  return sizes[size] || sizes['medium']
}

export default defineComponent({
  name,
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const selectRef = ref<HTMLDivElement>()

    const { provider, children } = createSelectContext()

    const [value, setValue] = useState<string | string[]>(props.modelValue || props.value)
    const [visible, setVisible] = useState<boolean>(false)
    const [clean, setClean] = useState<boolean>(false)
    const [teleport, setTeleport] = useState<string>('body')

    const empty = computed(() => hasEmpty(value.value))

    const cleanHandler = (e: Event, status: boolean) => {
      e.stopPropagation()
      e.preventDefault()
      setClean(status)
    }

    useClickAway(() => setVisible(false), selectRef, {
      event: 'click'
    })

    const setStyle = computed(() => {
      const { height, fontSize, minWidth } = querySelectSize(props.size)
      return {
        ['--select-minWidth']: minWidth,
        ['--select-height']: height,
        ['--select-fontSize']: fontSize
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

    const updateSelectValue = (val: string) => {
      setValue((pre) => {
        if (!Array.isArray(pre)) return val
        if (!pre.includes(val)) return [...pre, val]
        return pre.filter((item) => item !== val)
      })
    }

    provider({ setVisible, updateSelectValue })

    const clickHandler = (e: Event) => {
      if (props.disabled) return
      e.stopPropagation()
      e.preventDefault()
      setVisible(!visible.value)
    }

    watch(value, (cur) => {
      emit('change', cur)
      emit('update:modelValue', cur)
    })

    const queryChecked = computed(() => {
      const list = Array.isArray(value.value) ? value.value : [value.value]
      return children.filter((child) => list.includes(child.value))
    })

    /**
     * control show main context
     */
    const renderPlaceHolder = () => <span class="value fect-select__placeholder">{props.placeholder}</span>

    const renderNodes = () => {
      const { multiple, clearable } = props
      const list = queryChecked.value
      if (!multiple) return <span class="value">{list.map((_) => _.label)}</span>
      return (
        <GridGroup gap={0.5}>
          {list.map((_) => (
            <SelectMultiple onClear={() => updateSelectValue(_.value)} clearable={clearable}>
              {_.label}
            </SelectMultiple>
          ))}
        </GridGroup>
      )
    }

    /**
     * control clearable icon dispaly
     */

    const showClose = computed(() => {
      const { clearable, disabled, multiple } = props
      return clearable && !disabled && !empty.value && !multiple && clean.value
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
        onMouseenter={(e) => cleanHandler(e, true)}
        onMouseleave={(e) => cleanHandler(e, false)}
        onClick={clickHandler}
      >
        <SeelctInput visible={visible.value} />
        {empty.value ? renderPlaceHolder() : renderNodes()}
        <SelectDropDown teleport={teleport.value} v-slots={slots} visible={visible.value} parentRef={selectRef.value} />
        {renderRightIcon()}
      </div>
    )
  }
})
