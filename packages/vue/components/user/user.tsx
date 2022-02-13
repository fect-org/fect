import { defineComponent } from 'vue'
import Avatar from '../avatar'
import { createName, createBem } from '../utils'

import './index.less'

const name = createName('User')
const bem = createBem('fect-user')

export default defineComponent({
  name,
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    src: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    altText: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => (
      <div class={bem(null)}>
        <Avatar size="small" src={props.src} text={props.text} alt={props.altText} />
        <div class={bem('names')}>
          <span class="name">{props.name}</span>
          <span class="social">{slots.default?.()}</span>
        </div>
      </div>
    )
  }
})
