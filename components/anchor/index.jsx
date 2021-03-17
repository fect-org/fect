import { defineComponent, ref, watch } from 'vue'
import AnchorIcon from './anchor-icon'

const Anchor = defineComponent({
  props: {},
  setup(props, { slots }) {
    const tar = ref('')
    const anchorRef = ref(null)

    const anchorEncode = (text) => {
      if (!text) return undefined
      return text.toLowerCase().replace(/ /g, '')
    }

    watch(anchorRef, () => {
      const el = anchorRef.value.innerText
      tar.value = anchorEncode(el)
    })
    return () => (
      <>
        <span className="parent-anchor" ref={anchorRef}>
          <FayLink href={`#${tar.value}`}>{slots.default?.()}</FayLink>
          <span className="virtual" id={tar.value}></span>
          <span className="icon">
            <AnchorIcon />
          </span>
        </span>
        <style jsx>{`
          .parent-anchor {
            position: relative;
            color: inherit;
          }
          .parent-anchor a {
            color: inherit;
          }

          .virtual {
            position: absolute;
            top: -65px;
            left: 0;
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
          }

          .icon {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            left: -1.5em;
            top: 50%;
            transform: translateY(-50%);
            position: absolute;
            opacity: 0;
            visibility: hidden;
            font-size: inherit;
            width: 0.8em;
            height: 0.8em;
            margin-top: 1px;
            color: var(--accents-3);
          }

          .parent-anchor:hover > .icon {
            opacity: 1;
            visibility: visible;
          }
        `}</style>
      </>
    )
  },
})

export default Anchor
