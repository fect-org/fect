import { computed, ref } from 'vue'
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
  emits: ['change', 'blur', 'focus', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const inputRef = ref(null)
    const hover = ref(false)
    const setHoverable = (pre) => (hover.value = pre)

    const { heightRatio, fontSize } = queryInputSize(props.size)

    const focusHandler = (e) => {
      setHoverable(true)
      emit('update:modelValue', inputRef.value.value)
    }

    const blurHandler = (e) => {
      setHoverable(false)
    }

    const changeHandler = (e) => {
      emit('update:modelValue', inputRef.value.value)
    }

    const renderInput = () => {
      const InputProps = {
        ref: inputRef,
        value: props.modelValue,
        disabled: props.disabled,
        readOnly: props.readonly,
        placeholder: props.placeholder,
        autocomplete: props.autocomplete,
        onFocus: focusHandler,
        onBlur: blurHandler,
        onChange: changeHandler,
      }

      return (
        <>
          <input type={props.type} style={{ fontSize }} {...InputProps} />
          {props.clearable ? <ClearableIcon /> : ''}
          {props.type === 'password' ? (
            <IconContent>
              <PasswordIcon />
            </IconContent>
          ) : (
            ''
          )}
        </>
      )
    }

    return () => (
      <div class="fect-input" style={{ '--heightRatio': heightRatio }}>
        <div class={'input_container'}>
          <div class={`input_wrapper ${hover.value ? 'hover' : ''}`}>
            {renderInput()}
          </div>
        </div>
      </div>
    )
  },
})
