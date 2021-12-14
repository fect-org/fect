import { defineComponent } from 'vue'
import Avatar from '../avatar'
import { createName } from '../utils'

import './index.less'

const name = createName('User')

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
      <div class="fect-user">
        <Avatar size="small" src={props.src} text={props.text} alt={props.altText} />
        <div class="fect-user__names">
          <span class="name">{props.name}</span>
          <span class="social">{slots.default?.()}</span>
        </div>
      </div>
    )
  }
})
