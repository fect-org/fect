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
  setup(props, { slots, attrs }) {
    const hasLink = ref(false)

    watchEffect(() => {
      /**
       * use Boolean to  display ,magic implicit convert is no encourage
       */
      const isNull = Boolean(props?.to) || props.href !== ''
      hasLink.value = isNull
    })
    const { ctx } = useProvider(READONLY_BREADCRUMBS_KEY)

    if (!ctx) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          '[Fect] <BreadcrumbsItem> must be a child component of <Breadcrumbs>.',
        )
      }
      return
    }

    const content = slots.default?.()

    const withoutLinkRender = () => {
      return (
        <span class="fect-braed_item">
          {content}
          <Separator>{ctx?.separator}</Separator>
        </span>
      )
    }
    const linkRender = () => {
      return (
        <div class="fect-braed_item ">
          <Link
            to={props.to}
            href={props.href}
            class="withLink"
            target={attrs.target}
          >
            {content}
          </Link>
          <Separator>{ctx?.separator}</Separator>
        </div>
      )
    }

    return () => (
      <>{hasLink.value ? <>{linkRender()}</> : <>{withoutLinkRender()}</>}</>
    )
  },
})
