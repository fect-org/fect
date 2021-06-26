import { computed, toRefs, PropType, ref, watchEffect } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createNameSpace } from '../utils'
import { NormalSizes } from '../utils/theme/propTypes'
import SelectIcon from './select-icon'
import SelcetClearableIcon from './select-clear-icon'
import { CustomCSSProperties } from '../utils/base'

import './select.less'

const [createComponent] = createNameSpace('Select')

export const READONLY_SELECT_KEY = 'selectKey'

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
    const { provider } = createProvider(READONLY_SELECT_KEY)
    const selectRef = ref<HTMLDivElement>()
    const visible = ref<boolean>(false)
    const isEmpty = ref<boolean>(false)

    const setVisible = (cur: boolean) => (visible.value = cur)
    const setEmpty = (cur: boolean) => (isEmpty.value = cur)

    /**
     * isEmpty only work in modelvalue as empty
     */
    watchEffect(() => {
      const hasValue = !!props.modelValue
      hasValue && setEmpty(false)
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
      emit('update:modelValue', val)
    }

    const clearIconHandler = () => {
      setVisible(false)
      updateModelValue('')
    }

    /**
     * control show main context
     */
    const renderPlaceHolder = () => (
      <span class="value fect-select__placeholder">{props.placeholder}</span>
    )

    const renderNodes = () => {
      const classes = (props.multiple && 'fect-multiple__container') || 'value'
      return <span class={classes}>{props.modelValue}</span>
    }

    /**
     * show right icons
     */
    const showRightIcon = computed(() => {
      const { clearable, disabled, modelValue, multiple } = props
      return clearable && !disabled && modelValue && !multiple
    })

    const renderRightIcon = () => {
      if (showRightIcon.value) {
        return <SelcetClearableIcon onClick={clearIconHandler} />
      }
      return <SelectIcon class={(visible.value && 'click') || ''} />
    }

    return () => (
      <div class={setClass.value} ref={selectRef} style={setStyle.value}>
        {isEmpty.value ? renderPlaceHolder() : renderNodes()}
        {renderRightIcon()}
      </div>
    )
  },
})
