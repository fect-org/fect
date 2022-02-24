import { computed, ref, watch, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem, pick, getDomRect } from '../utils'
import Input from '../input'
import Tooltip, { TooltipProps } from '../tooltip'
import GridGroup from '../grid-group'
import { createSelectContext } from './select-context'
import SelectIcon from './select-icon'
import SelcetClearableIcon from './select-clear-icon'
import SelectMultiple from './select-multiple'
import SelectDropDown from './select-dropdown'
import { props } from './props'

import './index.less'

const name = createName('Select')
const bem = createBem('fect-select')

export default defineComponent({
  name,
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const selectRef = ref<HTMLDivElement>()
    const { provider, children } = createSelectContext()

    const [value, setValue] = useState<string | string[]>(props.modelValue || props.value)
    const [visible, setVisible] = useState<boolean>(false)
    const [dropdownWidth, setDropdownWidth] = useState<string>('')
    const [showClear, setShowClear] = useState<boolean>(false)

    const updateSelectValue = (val: string) => {
      setValue((pre) => {
        if (!Array.isArray(pre)) return val
        if (!pre.includes(val)) return [...pre, val]
        return pre.filter((item) => item !== val)
      })
    }

    provider({ setVisible, updateSelectValue })

    watch(value, (cur) => {
      emit('change', cur)
      emit('update:modelValue', cur)
    })

    const queryChecked = computed(() => {
      const list = Array.isArray(value.value) ? value.value : [value.value]
      return children.filter((child) => list.includes(child.value as string))
    })

    const renderNodes = () => {
      const { clearable } = props
      const list = queryChecked.value
      return (
        <GridGroup class={bem('multiple')} gap={0.5}>
          {list.map((_) => (
            <SelectMultiple onClear={() => updateSelectValue(_.value as string)} clearable={clearable}>
              {_.label}
            </SelectMultiple>
          ))}
        </GridGroup>
      )
    }

    watch(visible, () => {
      const rect = getDomRect(selectRef)
      const width = rect.width || rect.right - rect.left
      setDropdownWidth(`${width}px`)
    })

    const renderSelectWrapper = () => {
      const { multiple, clearable, disabled } = props
      const selectInputProps: any = {
        ...pick(props, ['disabled', 'size', 'placeholder'])
      }
      // eslint-disable-next-line prefer-destructuring
      const checkedValue = queryChecked.value.map((_) => _.label)[0]
      if (!multiple) {
        selectInputProps['modelValue'] = checkedValue
      }

      const showClearIcon = clearable && !disabled && checkedValue && showClear.value && !multiple

      const clearValueHandelr = (e: Event) => {
        if (showClearIcon) {
          e.stopImmediatePropagation()
          e.stopPropagation()
          setValue('')
          setVisible(false)
        }
      }

      const renderSelectSuffixIcon = () => {
        if (showClearIcon) return <SelcetClearableIcon class={bem('arrow')} />
        return <SelectIcon class={bem('arrow', { active: visible.value })} />
      }

      return (
        <div ref={selectRef} onMouseenter={() => setShowClear(true)} onMouseleave={() => setShowClear(false)}>
          {multiple && renderNodes()}
          <Input
            class={bem('input')}
            readonly
            role="combobox"
            aria-haspopup="listbox"
            onSuffix-icon-click={clearValueHandelr}
            aria-expanded={visible.value}
            {...selectInputProps}
            v-slots={{ ['suffix-icon']: () => renderSelectSuffixIcon() }}
          />
        </div>
      )
    }

    return () => {
      const _slots = {
        content: () => <SelectDropDown width={dropdownWidth.value} v-slots={slots} />,
        default: () => renderSelectWrapper()
      }

      const tooltipProps: Partial<TooltipProps> = {
        portalClass: bem('dropdown'),
        visible: visible.value,
        placement: 'bottom',
        trigger: 'click',
        visibleArrow: true,
        disabled: props.disabled
      }

      return (
        <div class={bem(null, { disabled: props.disabled, size: props.size })}>
          <Tooltip onChange={(cur) => setVisible(cur)} v-slots={_slots} {...tooltipProps} />
        </div>
      )
    }
  }
})
