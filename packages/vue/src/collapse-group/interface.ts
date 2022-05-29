import type { DeepReadonly, Ref } from 'vue'

export interface CollapseContext {
  checked: DeepReadonly<Ref<number[]>>
  updateCollapseGroupChecked(childIdx: number): void
}
