import { defineComponent } from 'vue'

const ActiveCateLog = defineComponent({
  props: {
    name: String,
  },
  setup(props, { slots }) {
    return () => (
      <>
        <span>
          {props.name}
          <style jsx>{`
            span {
              font-size: 13px;
              transition: all 0.2s ease;
              text-transform: uppercase;
              letter-spacing: 1.3px;
              color: #666;
            }
          `}</style>
        </span>
      </>
    )
  },
})

export default ActiveCateLog
