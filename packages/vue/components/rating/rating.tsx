import { computed, PropType, watch, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, CustomCSSProperties, NormalTypes } from '../utils'
import RatingIcon from './rating-icon'

import './index.less'

const name = createName('Rating')

const getColor = (type: NormalTypes): string => {
  const colors: { [key in NormalTypes]?: string } = {
    default: 'var(--primary-foreground)',
    success: 'var(--success-default)',
    warning: 'var(--warning-default)',
    error: 'var(--error-default)'
  }
  //  user may be entry types without NormalTypes
  return colors[type] || (colors.default as string)
}

export default defineComponent({
  name,
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default'
    },
    count: {
      type: Number,
      default: 5
    },
    locked: Boolean
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const [currentValue, setCurrentValue] = useState<number>(props.modelValue)

    watch(
      () => props.modelValue,
      (pre) => emit('change', pre)
    )

    const setSvgFillColor = computed(() => {
      const { type } = props
      return {
        '--rating-svg-color': getColor(type)
      } as CustomCSSProperties
    })

    const setActived = (idx: number) => {
      if (idx < currentValue.value) return 'hoverd'
      return ''
    }

    const updateModelValue = (val: number) => emit('update:modelValue', val)

    const clickHandler = (idx: number) => {
      if (props.locked) return
      updateModelValue(idx)
    }

    const mouseEnterHanlder = (idx: number) => {
      if (props.locked) return
      setCurrentValue(idx)
    }

    const mouseLeaveHandler = () => {
      if (props.locked) return
      setCurrentValue(props.modelValue)
    }

    const renderIcon = (key: number) => {
      const { locked } = props

      const icon = slots['icon']

      return (
        <div
          class={`fect-rating__box ${setActived(key)} ${locked ? 'is-locked' : ''}`}
          key={key}
          style={setSvgFillColor.value}
          onClick={() => clickHandler(key + 1)}
          onMouseenter={() => mouseEnterHanlder(key + 1)}
          onMouseleave={mouseLeaveHandler}
        >
          {icon ? icon() : <RatingIcon />}
        </div>
      )
    }

    return () => (
      <div class="fect-rating" role="slider" tabindex={0}>
        {[...Array(props.count)].map((_, idx) => renderIcon(idx))}
      </div>
    )
  }
})
