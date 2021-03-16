import { defineComponent } from 'vue'
import { createProvider } from '../../packages/utils'
const READONLY_SIDEBAR_KEY = 'siebarKey'
const SiderBar = defineComponent({
  setup(props, { slots }) {
    const { provider, children } = createProvider(READONLY_SIDEBAR_KEY)
    provider(props)
    return () => (
      <>
        <div className="sides box">
          <FayLink>111</FayLink>
          <style jsx>{`
            .sides {
              width: 100%;
              padding-bottom: 16pt;
            }
            .box {
              overflow-y: auto;
              overflow-x: hidden;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .box::-webkit-scrollbar {
              width: 0;
              background-color: transparent;
            }
          `}</style>
        </div>
      </>
    )
  },
})

export default SiderBar
