import { createBem, createName, isBrowser, addUnit } from '../utils'
import { computed, defineComponent, onMounted, ref, onBeforeUnmount } from 'vue'
import { props } from './props'
import { getTextareaAutoHeight } from './auto-height'
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
    const [autoHeight, setAutoHeight] = useState<string>('')

    let hiddenTextArea: HTMLTextAreaElement | undefined

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

    const resize = () => {
      if (props.autoHeight) {
        const { node, height } = getTextareaAutoHeight(textareaRef)
        if (!hiddenTextArea) hiddenTextArea = node
        setAutoHeight(height)
      }
    }
    const InputHandlerWithAutoCompute = (e: Event) => {
      InputHandler(e)
      resize()
    }

    const initlizeAutoHeight = () => {
      const browser = isBrowser()
      if (!browser) return
      if (!props.autoHeight) return
      if (textareaRef.value) {
        setAutoHeight(addUnit(textareaRef.value.scrollHeight))
      }
    }

    /**
     * we don't apply resize as initialization logic
     */
    onMounted(initlizeAutoHeight)

    onBeforeUnmount(() => {
      const browser = isBrowser()
      if (!browser) return
      if (hiddenTextArea) {
        hiddenTextArea.parentNode?.removeChild(hiddenTextArea)
        hiddenTextArea = undefined
      }
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
          style={{
            resize: props.resize,
            height: autoHeight.value ? `${autoHeight.value}` : '100%',
            width: props.width ? props.width : '100%'
          }}
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
