import { defineComponent, watch, computed } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName } from '../utils'

import './index.less'

const name = createName('Slider')

export default defineComponent({
  name,
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 100,
    },
    min: {
      type: Number,
      default: 0,
    },
    disabled: Boolean,
    showMarkers: Boolean,
    hideValue: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const [value, setValue] = useState<number>(props.modelValue)

    const setClass = computed(() => {
      const { disabled } = props
    })

    watch(value, (pre) => {
      emit('update:modelValue', pre)
      emit('change', pre)
    })

    //   slider-markers
    const renderMarkers = () => {}

    // slider-dot
    const renderDot = () => {}

    return () => (
      <div class="fect-slider" role="slider">
        {renderDot()}
        {props.showMarkers && renderMarkers()}
      </div>
    )
  },
})
