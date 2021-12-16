import { computed, ref, watchEffect, PropType, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, CustomCSSProperties, NormalSizes, assign } from '../utils'
import ClearableIcon from './clearable-icon'
import PasswordIcon from './password-icon'
import IconContent from './icon-content'
import InputLabel from './input-label'
import InputBlockLabel from './input-block-label'
import './index.less'

const name = createName('Input')

type InputSize = {
  heightRatio: string
  fontSize: string
}

const queryInputSize = (size: NormalSizes) => {
  const sizesPool: Record<NormalSizes, InputSize> = {
    mini: {
      heightRatio: '1.313',
      fontSize: '12px'
    },
    small: {
      heightRatio: '1.5',
      fontSize: '12px'
    },
    medium: {
      heightRatio: '1.687',
      fontSize: '14px'
    },
    large: {
      heightRatio: '1.875',
      fontSize: '16px'
    }
  }

  return sizesPool[size]
}

export default defineComponent({
  name,
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: { type: String, default: 'text' },
    placeholder: String,
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium'
    },
    autocomplete: String,
    readonly: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    prefix: [String, Number],
    suffix: [String, Number]
  },
  emits: ['change', 'blur', 'focus', 'clearClick', 'update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const inputRef = ref<HTMLInputElement>()
    const [hover, setHover] = useState<boolean>(false)
    const [selfType, setSelfType] = useState<string>(props.type)
    const [ratio, setRatio] = useState<string>()
    const [fontSize, setFontSize] = useState<string>()
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const [hasPrefix] = useState<boolean>(!!props.prefix)
    const [hasSuffix] = useState<boolean>(!!props.suffix)

    watchEffect(() => {
      const { heightRatio, fontSize } = queryInputSize(props.size)
      setRatio(heightRatio)
      setFontSize(fontSize)
    })

    const updatelValue = (val: string | number) => {
      if (props.type === 'number') {
        val = Number(val)
      }
      if (inputRef.value && val !== inputRef.value.value) {
        inputRef.value.value = val as string
      }
      if (val !== props.modelValue) {
        emit('update:modelValue', val)
      }
    }

    const InputHandler = (e: Event) => updatelValue((e.target as HTMLInputElement).value)

    const focusHandler = (e: Event) => {
      setHover(true)
      emit('focus', e)
    }

    const blurHandler = (e: Event) => {
      setHover(false)
      emit('blur', e)
    }

    const changeHandler = (e: Event) => {
      if (props.disabled || props.readonly) return
      emit('change', e)
    }

    const clearHandler = (e: Event) => {
      updatelValue('')
      emit('clearClick', e)
    }

    /**
     *control clearable icon visible
     */
    const setClearable = computed(() => Boolean(props.modelValue !== ''))

    const renderInput = () => {
      const InputProps = {
        ref: inputRef,
        value: props.modelValue,
        disabled: props.disabled,
        readOnly: props.readonly,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        onInput: InputHandler,
        onFocus: focusHandler,
        onBlur: blurHandler,
        onChange: changeHandler,
        ...attrs
      }

      const passwordVisibleChanger = () => {
        setPasswordVisible(!passwordVisible.value)
        if (passwordVisible.value) return setSelfType('text')
        return setSelfType('password')
      }

      return (
        <>
          <input
            type={selfType.value}
            class={`${props.disabled ? 'disabled' : ''}`}
            style={{ fontSize: fontSize.value }}
            {...InputProps}
          />
          {props.clearable && (
            <ClearableIcon
              visible={setClearable.value}
              disabled={props.disabled || props.readonly}
              onClick={clearHandler}
            />
          )}
          {props.type === 'password' && (
            <IconContent onClick={passwordVisibleChanger} clickable={props.disabled || props.readonly}>
              <PasswordIcon visible={passwordVisible.value} />
            </IconContent>
          )}
        </>
      )
    }

    const haslabel = computed(() => {
      const prefixStyle = {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      }
      const suffixStyle = {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      }

      if (hasPrefix.value && hasSuffix.value) {
        return assign(prefixStyle, suffixStyle)
      }
      if (hasPrefix.value) {
        return prefixStyle
      }
      if (hasSuffix.value) {
        return suffixStyle
      }
      return ''
    })

    const renderIcon = () => {
      return <div style="padding-left:6px;display:flex;align-items:center;justify-content:center">{slots.icon?.()}</div>
    }

    return () => (
      <div class="fect-input" style={{ '--heightRatio': ratio.value } as CustomCSSProperties}>
        {slots.default && <InputBlockLabel v-slots={slots} />}
        <div class={'fect-input__container'}>
          {hasPrefix.value && <InputLabel fontSize={fontSize.value}>{props.prefix}</InputLabel>}
          <div
            class={`fect-input__wrapper ${hover.value ? 'hover' : ''} ${props.disabled ? 'disabled' : ''}`}
            style={haslabel.value}
          >
            {slots.icon && renderIcon()}
            {renderInput()}
          </div>
          {hasSuffix.value && (
            <InputLabel fontSize={fontSize.value} isRight>
              {props.suffix}
            </InputLabel>
          )}
        </div>
      </div>
    )
  }
})
