import { watchEffect, defineComponent } from 'vue'
import { createName, createBem } from '../utils'
import { useState } from '@fect-ui/vue-hooks'
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
  setup(props, { slots, attrs }) {
    const [hasLink, setHasLink] = useState<boolean>(false)

    const { context } = useBreadcrumbsContext()

    watchEffect(() => {
      const isNull = Boolean(props?.to) || props.href !== ''
      setHasLink(isNull)
    })

    if (!context) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Fect] <BreadcrumbsItem> must be a child component of <Breadcrumbs>.')
      }
      return
    }

    const withoutLinkRender = () => {
      return (
        <span class={bem('item')}>
          {slots.default?.()}
          <Separator>{context.separator.value}</Separator>
        </span>
      )
    }

    const linkRender = () => {
      return (
        <div class={bem('item')}>
          <Link to={props.to} href={props.href} class={bem('link')} {...attrs}>
            {slots.default?.()}
          </Link>
          <Separator>{context.separator.value}</Separator>
        </div>
      )
    }

    return () => <>{hasLink.value ? <>{linkRender()}</> : <>{withoutLinkRender()}</>}</>
  }
})
