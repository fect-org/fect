import { defineComponent, watch, computed, ref, Ref } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, getDomRect, useDraggable } from '../utils'
import type { Position } from '../utils'

import './index.less'

const name = createName('Slider')

type Marks = number[]

type GetMarks = (min: number, max: number, step: number) => Marks

type GetValue = (max: number, min: number, step: number, offsetX: number, railWidth: number) => number

/**
 * step is the distance value of each movement of the slider
 */
const getMarks: GetMarks = (min, max, step) => {
  const value = max - min
  const integer = !!(value % step) ? Math.ceil : Math.floor
  const count = integer(value / step) - 1
  if (count >= 99) return []
  return [...new Array(count)].map((_, index) => (step * (index + 1) * 100) / value)
}

const getValue: GetValue = (max, min, step, offsetX, railWidth) => {
  if (offsetX < 0) return min
  if (offsetX > railWidth) return max
  const widthForEachStep = (railWidth / (max - min)) * step
  if (widthForEachStep <= 0) return min

  const slideDistance = Math.round(offsetX / widthForEachStep) * step + min
  return Number.isInteger(slideDistance) ? slideDistance : Number.parseFloat(slideDistance.toFixed(1))
}

export default defineComponent({
  name,
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    showMarkers: Boolean,
    hideValue: Boolean
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const sliderRef = ref<HTMLDivElement>()
    const dotRef = ref<HTMLDivElement>()
    const [value, setValue] = useState<number>(props.modelValue)
    const [sliderWidth, setSliderWidth] = useState<number>(0)
    const [isClick, setIsClick] = useState<boolean>(false)
    const [lastDragOffset, setLastDragOffset] = useState<number>(0)
    const marks = computed(() => getMarks(props.min, props.max, props.step))

    const setDotPosition = computed(() => {
      const { max, min } = props
      return ((value.value - min) / (max - min)) * 100
    })

    //   slider-markers
    const renderMarkers = () =>
      marks.value.map((val, idx) => (
        <span class="fect-slider__mark" key={`${val}-${idx}`} style={{ left: `${val}%` }} />
      ))

    // slider-dot
    const renderDot = () => {
      return (
        <div
          class={`fect-slider__dot ${isClick.value ? 'click' : ''}`}
          ref={dotRef}
          style={{ left: `${setDotPosition.value}%` }}
        >
          {props.hideValue || value.value}
        </div>
      )
    }

    const updateValue = (offset: number) => {
      const { max, min, step } = props
      const currentValue = getValue(max, min, step, offset, sliderWidth.value)
      setValue(currentValue)
    }

    const clickHandler = (e: MouseEvent) => {
      if (props.disabled) return
      setIsClick(true)
      const { x: sliderX, width } = getDomRect(sliderRef)
      setSliderWidth(width)
      const clickOffset = e.clientX - sliderX
      setLastDragOffset(clickOffset)
      updateValue(clickOffset)
    }

    const dragStartHandler = () => {
      setIsClick(false)
      const { width } = getDomRect(sliderRef)
      setSliderWidth(width)
    }

    const dragMoveHandler = (_: Event, position: Ref<Position>) => {
      if (props.disabled) return
      const currentOffset = position.value.x
      const offset = currentOffset + lastDragOffset.value
      updateValue(offset)
    }

    const dragEndHandler = (_: Event, positon: Ref<Position>) => {
      if (props.disabled) return
      const currentOffset = positon.value.x + lastDragOffset.value
      const boundOffset = currentOffset < 0 ? 0 : Math.min(currentOffset, sliderWidth.value)
      setLastDragOffset(boundOffset)
    }

    useDraggable(dotRef, {
      onStart: dragStartHandler,
      onMove: dragMoveHandler,
      onEnd: dragEndHandler
    })

    watch(value, (pre) => {
      emit('update:modelValue', pre)
      emit('change', pre)
    })

    return () => (
      <div
        class={`fect-slider ${props.disabled ? 'disabled' : ''}`}
        ref={sliderRef}
        role="slider"
        title={value.value + '%'}
        onClick={clickHandler}
      >
        {renderDot()}
        {props.showMarkers && renderMarkers()}
      </div>
    )
  }
})
