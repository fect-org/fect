import { defineComponent } from 'vue'

const CodeComponent = defineComponent({
  setup(props, { slots }) {
    return () => (
      <div className="code-components">
        {slots.default?.()}
        <style jsx>{`
          .code-components {
            width: 100%;
            padding: 16pt;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
          .code-components > div {
          width:100%:
          }
        `}</style>
      </div>
    )
  },
})

export default CodeComponent
