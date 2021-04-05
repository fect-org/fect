import { defineComponent } from 'vue'
import { createProvider } from '../../packages/utils'
import SideItem from './side-item'
import Widgets from './widgets'
const READONLY_SIDEBAR_KEY = 'siebarKey'
const SiderBar = defineComponent({
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_SIDEBAR_KEY)
    const Routes = [
      {
        title: '快速上手',
        rule: [
          {
            name: '什么是Fect UI',
            url: '/zh-cn/quickStart/introduce',
            index: 1,
          },
          { name: '安装', url: '/zh-cn/quickStart/install', index: 2 },
        ],
      },
    ]
    provider({ route: Routes })
    return () => (
      <>
        <div className="sides box">
          <Widgets />
          <fectSpacer />
          <SideItem />
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
            .box > .item {
              margin-bottom: 16pt;
            }
            @media only screen and (max-width: 650px) {
              .box {
                display: none;
                padding: calc(3.5 * 16pt) 15vw;
                width: 100vw;
                height: 100%;
              }
            }
          `}</style>
        </div>
      </>
    )
  },
})

export default SiderBar
