import { defineComponent, ref } from 'vue'
import AnchorIcon from './anchor.icon'

import './anchor.common.less'

const Anchor = defineComponent({
  props: {},
  setup(props, { slots }) {
    const tar = ref('')
    const anchorRef = ref(null)

    const anchorEncode = (text) => {
      if (!text) return undefined
      return text.toLowerCase().replace(/ /g, '')
    }

    const handlerClickAnchor = () => {
      const el = anchorRef.value.innerText
      tar.value = anchorEncode(el)
    }

    return () => (
      <>
        <span
          className="f_doc-anchor"
          ref={anchorRef}
          onClick={handlerClickAnchor}
        >
          {/* style={{ fontSize: '1.65rem' }} */}
          <fectLink href={`#${tar.value}`}>{slots.default?.()}</fectLink>
          <span className="f_doc-anchor_virtual" id={tar.value}></span>
          <span className="f_doc-anchor_icon">
            <AnchorIcon />
          </span>
        </span>
      </>
    )
  },
})

export default Anchor
