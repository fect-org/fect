import { createBem, createName } from '../utils'
import { computed, CSSProperties, defineComponent, onMounted, ref } from 'vue'
import { props } from './props'
import { useState } from '@fect-ui/vue-hooks'
import { useFormStateContext, pickFormStateProps } from '../form/form-context'

import './index.less'

const name = createName('Textarea')
const bem = createBem('fect-textarea')

export default defineComponent({
  name,
  props,
  emits: ['update:modelValue', 'change', 'blur', 'focus'],
  setup(props, { emit, attrs }) {
    const textareaRef = ref<HTMLTextAreaElement>()
    const [hover, setHover] = useState<boolean>(false)

    const formState = useFormStateContext()

    const getTextareaState = computed(() => {
      const { disabled } = pickFormStateProps({ disabled: props.disabled }, null, formState?.behavior.value)
      return { disabled }
    })

    const changeHandler = (e: Event) => {
      emit('change', e)
    }

    const focusHandler = (e: Event) => {
      setHover(true)
      emit('focus', e)
    }

    const blurHandler = (e: Event) => {
      setHover(false)
      emit('blur', e)
    }

    const updatelValue = (val: string | number) => {
      if (textareaRef.value && val !== textareaRef.value.value) {
        textareaRef.value.value = val as string
      }
      if (val !== props.modelValue) {
        emit('update:modelValue', val)
        if (formState) formState.validate('change')
      }
    }

    const InputHandler = (e: Event) => updatelValue((e.target as HTMLTextAreaElement).value)

    const autoHeight = ref(0)

    const resize = () => {
      if (props.autoHeight) {
        autoHeight.value = textareaRef.value?.scrollHeight || 0
      }
    }
    const InputHandlerWithAutoCompute = (e: Event) => {
      resize()
      InputHandler(e)
    }

    onMounted(() => {
      resize()
    })

    const renderTextarea = () => {
      const TextareaProps = {
        ref: textareaRef,
        value: props.modelValue,
        disabled: getTextareaState.value.disabled,
        readOnly: props.readonly,
        autocomplete: props.autocomplete,
        placeholder: props.placeholder,
        onInput: InputHandlerWithAutoCompute,
        onFocus: focusHandler,
        onBlur: blurHandler,
        onChange: changeHandler,
        ...attrs
      }

      const disabled = getTextareaState.value.disabled ? 'disabled' : ''

      return (
        <textarea
          class={disabled}
          style={{ resize: props.resize, height: autoHeight.value ? `${autoHeight.value}px` : '100%' }}
          {...TextareaProps}
        />
      )
    }

    return () => (
      <div
        class={bem(null, {
          hover: hover.value,
          disabled: getTextareaState.value.disabled
        })}
      >
        {renderTextarea()}
      </div>
    )
  }
})
