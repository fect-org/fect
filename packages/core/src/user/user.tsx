import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../provider/theme-context'
import Avatar from '../avatar'
import { createName, createBem } from '../utils'

import './index.less'

const name = createName('User')
const bem = createBem('fect-user')

export default defineComponent({
  name,
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    src: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    altText: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const { getScaleableProps, SCALES } = useScale()
    const { theme } = useTheme()

    const scale = getScaleableProps<number | undefined>(['scale'])

    const setCssVariables = computed(() => {
      const { palette, layout } = theme.value
      return {
        '--user-gap-half': layout.gapHalf,
        '--user-name-color': palette.accents_8,
        '--user-social-color': palette.accents_6,
        '--user-font-size': SCALES.font(1),
        '--user-width': SCALES.width(1, 'max-content'),
        '--user-height': SCALES.height(1, 'auto'),
        '--user-pt': SCALES.pt(0),
        '--user-pr': SCALES.pr(0.5),
        '--user-pb': SCALES.pb(0),
        '--user-pl': SCALES.pl(0.5),
        '--user-mt': SCALES.mt(0),
        '--user-mr': SCALES.mr(0),
        '--user-mb': SCALES.mb(0),
        '--user-ml': SCALES.ml(0)
      }
    })

    return () => (
      <div class={bem(null)} style={setCssVariables.value}>
        <Avatar scale={scale.value} src={props.src} text={props.text} alt={props.altText} />
        <div class={bem('names')}>
          <span class="name">{props.name}</span>
          <span class="social">{slots.default?.()}</span>
        </div>
      </div>
    )
  }
})
