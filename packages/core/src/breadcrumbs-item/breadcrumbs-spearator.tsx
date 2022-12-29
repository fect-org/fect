import { computed, defineComponent } from 'vue'
import { useScale, withScale } from '@fect-ui/scale'
import { createBem } from '../utils'

const bem = createBem('fect-breadcrumbs')

const BreadcrumbsSpearator = defineComponent({
  setup(props, { slots }) {
    const { SCALES } = useScale()

    const setCssVariables = computed(() => {
      return {
        '--breadcrumbs-spearator-width': SCALES.width(1, 'auto'),
        '--breadcrumbs-spearator-height': SCALES.height(1, 'auto'),
        '--breadcrumbs-spearator-pt': SCALES.pt(0),
        '--breadcrumbs-spearator-pr': SCALES.pr(0),
        '--breadcrumbs-spearator-pb': SCALES.pb(0),
        '--breadcrumbs-spearator-pl': SCALES.pl(0),
        '--breadcrumbs-spearator-mt': SCALES.mt(0),
        '--breadcrumbs-spearator-mr': SCALES.mr(0.5),
        '--breadcrumbs-spearator-mb': SCALES.mb(0),
        '--breadcrumbs-spearator-ml': SCALES.ml(0.5)
      }
    })

    return () => (
      <div class={bem('separator')} style={setCssVariables.value}>
        {slots.default?.()}
      </div>
    )
  }
})

export default withScale(BreadcrumbsSpearator)
