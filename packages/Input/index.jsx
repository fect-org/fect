import { computed, onMounted, ref, watchEffect } from 'vue'
import { createNameSpace, theme, validator } from '../utils'
import ClearableIcon from './clearable-icon'
import PasswordIcon from './password-icon'
import IconContent from './icon-content'
import './input.less'

const [createComponent] = createNameSpace('Input')

const { normalSizes } = theme

const queryInputSize = (size) => {
  const sizesPool = {
    mini: {
      heightRatio: '1.313',
      fontSize: '12px',
    },
    small: {
      heightRatio: '1.5',
      fontSize: '12px',
    },
    medium: {
      heightRatio: '1.687',
      fontSize: '14px',
    },
    large: {
      heightRatio: '1.875',
      fontSize: '16px',
    },
  }

  return sizesPool[size]
}

export default createComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: { type: String, default: 'text' },
    placeholder: String,
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
    autocomplete: String,
    readonly: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    label: [String, Number],
  },
  emits: ['change', 'blur', 'focus', 'clearClick', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const inputRef = ref(null)
    const hover = ref(false)
    const selfType = ref(props.type)
    const passwordVisible = ref(false)
    const fontSize = ref(null)
    const heightRatio = ref(null)
    const hasLabel = ref(!!props.label)

    const setHoverable = (pre) => (hover.value = pre)

    watchEffect(() => {
      const { heightRatio: Ratio, fontSize: Size } = queryInputSize(props.size)
      heightRatio.value = Ratio
      fontSize.value = Size
    })

    const updatelValue = (val) => {
      if (props.type === 'number') {
        val = Number(val)
      }
      if (inputRef.value && val !== inputRef.value.value) {
        inputRef.value.value = val
      }
      if (val !== props.modelValue) {
        emit('update:modelValue', val)
      }
    }

    const InputHandler = (e) => updatelValue(e.target.value)

    const focusHandler = (e) => {
      setHoverable(true)
      emit('focus', e)
    }

    const blurHandler = (e) => {
      setHoverable(false)
      emit('blur', e)
    }

    const changeHandler = (e) => {
      if (props.disabled || props.readonly) return
      emit('change', e)
    }

    const clearHandler = (e) => {
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
        ...attrs,
      }

      const setPasswordVisible = () => {
        passwordVisible.value = !passwordVisible.value
        if (passwordVisible.value) return (selfType.value = 'text')
        return (selfType.value = 'password')
      }

      return (
        <>
          <input
            type={selfType.value}
            class={`${props.disabled ? 'disabled' : ''}`}
            style={{ fontSize: fontSize.value }}
            {...InputProps}
          />
          {props.clearable ? (
            <ClearableIcon
              visible={setClearable.value}
              disabled={props.disabled || props.readonly}
              onClick={clearHandler}
            />
          ) : (
            ''
          )}
          {props.type === 'password' ? (
            <IconContent onClick={setPasswordVisible}>
              <PasswordIcon visible={passwordVisible.value} />
            </IconContent>
          ) : (
            ''
          )}
        </>
      )
    }

    return () => (
      <div class="fect-input" style={{ '--heightRatio': heightRatio.value }}>
        <div class={'input_container'}>
          <div
            class={`input_wrapper ${hover.value ? 'hover' : ''} ${
              props.disabled ? 'disabled' : ''
            }`}
          >
            {renderInput()}
          </div>
        </div>
      </div>
    )
  },
})
