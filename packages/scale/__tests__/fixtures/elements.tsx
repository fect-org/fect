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
    const scale = useScale()
    return () => (
      <div class={props.type}>
        <p class="unit">{scale.unit}</p>
        <p class="mr">{scale.SCALES.mr(1, '20px')}</p>
        <p class="ml">{scale.SCALES.ml(1, undefined)}</p>
        <p class="width">{scale.SCALES.width(0)}</p>
      </div>
    )
  }
})

export const ScaleElement = withScale(Element)
