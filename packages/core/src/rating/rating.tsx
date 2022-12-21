import { PropType, watch, defineComponent } from 'vue'
import { useState, useExpose } from '@fect-ui/vue-hooks'
import { make } from '@fect-ui/shared'
import { createName, createBem } from '../utils'
import RatingIcon from './rating-icon'

import type { NormalTypes } from '../utils'

import './index.less'

const name = createName('Rating')
const bem = createBem('fect-rating')

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
      (cur) => setCurrentValue(cur)
    )

    const updateModelValue = (val: number) => {
      emit('update:modelValue', val)
      emit('change', val)
    }

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

      const { icon } = slots

      return (
        <div
          class={bem('box', { locked, hover: key < currentValue.value })}
          key={key}
          onClick={() => clickHandler(key + 1)}
          onMouseenter={() => mouseEnterHanlder(key + 1)}
          onMouseleave={mouseLeaveHandler}
        >
          {icon ? icon() : <RatingIcon />}
        </div>
      )
    }

    useExpose({
      value: currentValue
    })

    return () => (
      <div class={bem(null, props.type)} role="slider" tabindex={0}>
        {make(props.count).map((_, idx) => renderIcon(idx))}
      </div>
    )
  }
})
