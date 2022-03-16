import { PropType, defineComponent, toRef } from 'vue'
import { createName, createBem } from '../utils'
import type { NormalSizes } from '../utils'
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
    },
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium'
    }
  },
  setup(props, { slots }) {
    const { provider } = createBreadcrumbsContext()
    provider({ separator: toRef(props, 'separator') })

    return () => <nav class={bem(null, props.size)}>{slots.default?.()}</nav>
  }
})
