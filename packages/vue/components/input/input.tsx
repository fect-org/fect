import { defineComponent, computed, ref } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem } from '../utils'
import { props } from './props'
import ClearableIcon from './clearable-icon'
import PasswordIcon from './password-icon'
import InputIconContent from './input-icon-content'
import InputLabel from './input-label'

import './index.less'

const name = createName('Input')

const bem = createBem('fect-input')

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: ['change', 'blur', 'focus', 'clearClick', 'update:modelValue', 'prefix-icon-click', 'suffix-icon-click'],
  setup(props, { slots, emit, attrs }) {
    const inputRef = ref<HTMLInputElement>()
    const [hover, setHover] = useState<boolean>(false)
    const [selfType, setSelfType] = useState<string>(props.type)
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

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

    const passwordVisibleChanger = () => {
      setPasswordVisible((pre) => !pre)
      if (passwordVisible.value) return setSelfType('text')
      return setSelfType('password')
    }

    const shouldClick = computed(() => !props.disabled || !props.readonly)

    const iconClickHandler = (event: 'prefix-icon-click' | 'suffix-icon-click', e: Event) => {
      emit(event, e)
    }

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

      const disabled = props.disabled ? 'disabled' : ''
      const shouldClearIcon = props.clearable && Boolean(props.modelValue)

      return (
        <>
          <input type={selfType.value} class={disabled} {...InputProps} />
          {props.clearable && (
            <InputIconContent onClick={clearHandler} clickable={shouldClick.value && shouldClearIcon} suffix>
              <ClearableIcon visible={Boolean(props.modelValue)} />
            </InputIconContent>
          )}
        </>
      )
    }

    const renderPrefixIcon = () => {
      const prefixSlot = slots['prefix-icon']
      if (prefixSlot)
        return (
          <InputIconContent
            clickable={shouldClick.value}
            onClick={(e) => iconClickHandler('prefix-icon-click', e)}
            prefix
            v-slots={prefixSlot}
          />
        )
      return null
    }

    const renderSuffixIcon = () => {
      const suffixSlot = slots['suffix-icon']
      if (suffixSlot)
        return (
          <InputIconContent
            clickable={shouldClick.value}
            onClick={(e) => iconClickHandler('suffix-icon-click', e)}
            suffix
            v-slots={suffixSlot}
          />
        )

      return (
        <>
          {props.type === 'password' && (
            <InputIconContent onClick={passwordVisibleChanger} clickable={shouldClick.value} suffix>
              <PasswordIcon visible={passwordVisible.value} />
            </InputIconContent>
          )}
        </>
      )
    }
    // icon => prefix-icon , and add suffix-icon

    return () => {
      const hasSuffix = Boolean(props.suffix)
      const hasPrefix = Boolean(props.prefix)
      return (
        <div class={bem(null, props.size)}>
          {slots.default && <label>{slots.default()}</label>}
          <div class={bem('container')}>
            {hasPrefix && <InputLabel prefix>{props.prefix}</InputLabel>}
            <div
              class={bem('wrapper', {
                hover: hover.value,
                prefix: hasPrefix,
                suffix: hasSuffix,
                disabled: props.disabled
              })}
            >
              {renderPrefixIcon()}
              {renderInput()}
              {renderSuffixIcon()}
            </div>
            {hasSuffix && <InputLabel suffix>{props.suffix}</InputLabel>}
          </div>
        </div>
      )
    }
  }
})
