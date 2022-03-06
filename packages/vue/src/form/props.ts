import { NormalSizes } from '../utils'
import { PropType, ExtractDefaultPropTypes } from 'vue'
import type { LabelPosition } from './interface'

export const props = {
  model: {
    type: Object,
    default: () => {
      /* 抱苏卡卡的毛绒绒狐狸尾巴 */
    }
  },
  rules: {
    type: Object,
    default: () => {
      /* 抱苏卡卡的毛绒绒狐狸尾巴 */
    }
  },
  inline: Boolean,
  labelPosition: {
    type: String as PropType<LabelPosition>,
    default: 'right'
  },
  labelWidth: {
    type: [String, Number],
    default: 'auto'
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  }
}

export type FormProps = ExtractDefaultPropTypes<typeof props>
