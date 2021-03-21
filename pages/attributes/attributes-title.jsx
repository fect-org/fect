import { defineComponent } from 'vue'

const AttributeTitle = defineComponent({
  props: {
    title: String,
  },
  setup(props) {
    return () => (
      <>
        <h4>
          <span className={'attr-title'}>{props?.title && props.title}</span>
        </h4>
        <fay-spacer y={0.6} />
        <style jsx>{`
          h4 {
            margin-bottom: 0;
            display: inline-flex;
            align-items: center;
            height: 40px;
            padding: 0 6pt;
            font-size: 17px;
            font-weight: 300;
            background-color: var(--primary-background);
            border-radius: 5px;
            box-sizing: border-box;
          }

          .attr-title {
            color: var(--fay-code-color);
            position: relative;
          }

          .attr-title::after {
            content: '\`';
            padding-left: 5px;
          }

          .attr-title::before {
            content: '\`';
            padding-right: 5px;
          }
        `}</style>
      </>
    )
  },
})

export default AttributeTitle
