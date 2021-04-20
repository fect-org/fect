import { defineComponent, onMounted, ref } from 'vue'
import AnchorIcon from './anchor.icon'

import './anchor.common.less'

const Anchor = defineComponent({
  props: {},
  setup(props, { slots }) {
    const tar = ref('')
    const anchorRef = ref(null)

    onMounted(() => {
      const el = anchorRef.value.innerText
      tar.value = anchorEncode(el)
    })

    const anchorEncode = (text) => {
      if (!text) return undefined
      return text.toLowerCase().replace(/ /g, '')
    }

    return () => (
      <>
        <span className="f_doc-anchor" ref={anchorRef}>
          {/* style={{ fontSize: '1.65rem' }} */}
          <feLink href={`#${tar.value}`}>{slots.default?.()}</feLink>
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
