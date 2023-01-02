import { defineComponent } from 'vue'
import { useScale, withScale } from '../../src'

import type { PropType } from 'vue'

type ElementType = 'classic' | 'normal'

export const Element = defineComponent({
  props: {
    type: {
      type: String as PropType<ElementType>
    }
  },
  setup(props) {
    const { SCALES, unit } = useScale()
    return () => (
      <div class={props.type}>
        <p class="unit">{unit.value}</p>
        <p class="mr">{SCALES.mr(1, '20px')}</p>
        <p class="ml">{SCALES.ml(1, undefined)}</p>
        <p class="width">{SCALES.width(0)}</p>
      </div>
    )
  }
})

export const ScaleElement = withScale(Element)
