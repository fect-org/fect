import { computed, ref } from 'vue'
import { createNameSpace, useState } from '../utils'
import {
  ButtonTypes,
  LoadingTypes,
  NormalSizes,
} from '../utils/theme/propTypes'
import { CustomCSSProperties } from '../utils/base'

import { props } from './props'
import ButtonLoading from './button-loading'
import { queryHoverColor } from './style'

import './_index.less'
const [createComponent] = createNameSpace('Button')

export default createComponent({
  props,
  emits: ['click'],
  setup(props, { slots, emit }) {
    const buttonRef = ref<HTMLButtonElement>()
    const [drapShow, setDrapShow] = useState<boolean>(false)
    const [drapX, setDrapX] = useState<number>(0)
    const [drapY, setDrapY] = useState<number>(0)

    const clickHandler = (e: MouseEvent) => {
      emit('click', e)
    }

    /**
     * set ghost disabled shadow className
     */
    const setButtonStatus = computed(() => {
      const { ghost, disabled, shadow } = props
      const names = []
      disabled && names.push('is-disabled')
      ghost && names.push('is-ghost')
      shadow && names.push('is-shadow')
      return names.join(' ')
    })

    const setStyle = computed(() => {
      const { type, ghost } = props
      //  return ghost?'a'
      const { bg, border, color } = queryHoverColor(type, ghost)
      const style: CustomCSSProperties = {
        '--button-hover-bg': bg,
        '--button-hover-border': border,
        '--button-hover-color': color,
      }
      return style
    })

    return () => (
      <button
        class={`fect-button 
        fect-button--${props.type} 
        fect-button--${props.size}
        ${setButtonStatus.value}`}
        ref={buttonRef}
        style={setStyle.value}
        onClick={clickHandler}
      >
        {props.loading && <ButtonLoading loadType={props.loadType} />}
        {slots.default?.()}
      </button>
    )
  },
})
