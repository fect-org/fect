import { ref, watchEffect } from 'vue'
import { createNameSpace, useProvider } from '../utils'
import Link from '../Link'
const [createComponent] = createNameSpace('BreadcrumbsItem')
import './breadcrumbsItem.less'
import Separator from './breadcrumbs.spearator'
const READONLY_BREADCRUMBS_KEY = 'breadcrumbsKey'

export default createComponent({
  props: {
    to: {
      type: [String, Object],
      default: () => {},
    },
    href: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    const hasLink = ref(false)

    watchEffect(() => {
      /**
       * use Boolean to  display ,magic implicit convert is no encourage
       */
      const isNull = Boolean(props?.to) || props.href !== ''
      hasLink.value = isNull
    })
    const { ctx } = useProvider(READONLY_BREADCRUMBS_KEY)

    const content = slots.default?.()

    const withoutLinkRender = () => {
      return (
        <span class="fect-braed_item">
          {content} <Separator>{ctx.separator}</Separator>
        </span>
      )
    }
    const linkRender = () => {
      return (
        <Link class="fect-braed_item withLink" to={props.to} href={props.href}>
          {content}
          <Separator>{ctx.separator}</Separator>
        </Link>
      )
    }

    return () => (
      <>{hasLink.value ? <>{linkRender()}</> : <>{withoutLinkRender()}</>}</>
    )
  },
})
