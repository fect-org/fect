import { defineComponent } from 'vue'

const Widgets = defineComponent({
  setup() {
    return () => (
      <>
        <div className="widgest-container">
          {/* href="https://github.com/fay-org/Yuki" */}
          <FayLink href="https://github.com/fay-org/Yuki">代码仓库</FayLink>
          <style jsx>{`
            .widgest-container {
              width: 100%;
              font-size: 0.9rem;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .widgest-container::before {
              content: '';
              height: 100%;
              width: 0.3rem;
              left: 50px;
              background-color: var(--accents-7);
              position: absolute;
            }
          `}</style>
        </div>
      </>
    )
  },
})

export default Widgets
