import { PropType, defineComponent } from 'vue'
import { createName, createBem } from '../utils'
import type { NormalSizes } from '../utils'
import './index.less'
import { createBreadcrumbsContext } from './breadcrumbs-context'

const name = createName('Breadcrumbs')

export default defineComponent({
  name,
  props: {
    separator: {
      type: String,
      default: '/'
    },
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium'
    }
  },
  setup(props, { slots }) {
    const { provider } = createBreadcrumbsContext()
    provider({ separator: props.separator })

    return () => <nav class={`fect-breadcrumbs ${createBem('fect-breadcrumbs', props.size)}`}>{slots.default?.()}</nav>
  }
})
