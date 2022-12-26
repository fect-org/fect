import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { createName, createBem } from '../utils'

import './index.less'

const name = createName('Spacer')
const bem = createBem('fect-spacer')

export default defineComponent({
  name,
  props: {
    inline: Boolean
  },
  setup(props) {
    const scale = useScale()

    const getCssVariables = computed(() => {
      const { SCALES } = scale
      return {
        '--spacer-width': SCALES.width(1),
        '--spacer-height': SCALES.height(1),
        '--spacer-pt': SCALES.pt(0),
        '--spacer-pr': SCALES.pr(0),
        '--spacer-pb': SCALES.pb(0),
        '--spacer-pl': SCALES.pl(0),
        '--spacer-mt': SCALES.mt(0),
        '--spacer-mr': SCALES.mr(0),
        '--spacer-mb': SCALES.mb(0),
        '--spacer-ml': SCALES.ml(0)
      }
    })

    return () => <span class={bem(null, { inline: props.inline })} style={getCssVariables.value}></span>
  }
})
