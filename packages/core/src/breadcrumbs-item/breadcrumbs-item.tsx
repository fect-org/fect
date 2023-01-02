import { computed, defineComponent } from 'vue'
import { createName, createBem, isDEV } from '../utils'
import { useBreadcrumbsContext } from '../breadcrumbs/breadcrumbs-context'
import Link from '../link'
import Separator from './breadcrumbs-spearator'
import './index.less'

const name = createName('BreadcrumbsItem')
const bem = createBem('fect-breadcrumbs')

export default defineComponent({
  name,
  props: {
    to: {
      type: [String, Object],
      default: ''
    },
    href: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const { context } = useBreadcrumbsContext()

    const link = computed(() => !!props.to || props.href !== '')

    if (!context) {
      if (isDEV) console.error('[Fect] <BreadcrumbsItem> must be a child component of <Breadcrumbs>.')
      return
    }

    return () => {
      return (
        <div class={bem('item')}>
          {link.value ? (
            <Link to={props.to} href={props.href}>
              {slots.default?.()}
            </Link>
          ) : (
            slots.default?.()
          )}
          <Separator>{context.props.separator}</Separator>
        </div>
      )
    }
  }
})
