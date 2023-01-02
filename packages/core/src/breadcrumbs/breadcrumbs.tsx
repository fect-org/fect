import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../provider/theme-context'
import { createName, createBem } from '../utils'
import './index.less'
import { createBreadcrumbsContext } from './breadcrumbs-context'

const name = createName('Breadcrumbs')
const bem = createBem('fect-breadcrumbs')

export default defineComponent({
  name,
  props: {
    separator: {
      type: String,
      default: '/'
    }
  },
  setup(props, { slots }) {
    const { theme } = useTheme()
    const { SCALES } = useScale()
    const { provider } = createBreadcrumbsContext()

    const setCssVariables = computed(() => {
      const { palette } = theme.value
      return {
        '--breadcrumbs-color': palette.accents_4,
        '--breadcrumbs-last-color': palette.accents_6,
        '--breadcrumbs-font-size': SCALES.font(1),
        '--breadcrumbs-width': SCALES.width(1, 'auto'),
        '--breadcrumbs-height': SCALES.height(1, 'auto'),
        '--breadcrumbs-pt': SCALES.pt(0),
        '--breadcrumbs-pr': SCALES.pr(0),
        '--breadcrumbs-pb': SCALES.pb(0),
        '--breadcrumbs-pl': SCALES.pl(0),
        '--breadcrumbs-mt': SCALES.mt(0),
        '--breadcrumbs-mr': SCALES.mr(0),
        '--breadcrumbs-mb': SCALES.mb(0),
        '--breadcrumbs-ml': SCALES.ml(0)
      }
    })

    provider({ props })

    return () => (
      <nav class={bem(null)} style={setCssVariables.value}>
        {slots.default?.()}
      </nav>
    )
  }
})
