import type { ExtractPropTypes } from 'vue'
import { avatarGroupProps } from './props'

export interface AvatarContext {
  props: ExtractPropTypes<typeof avatarGroupProps>
}
