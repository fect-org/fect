import type { Ref } from 'vue'

export interface CollapseContext {
  checked: Ref<number[]>
  updateCollapseGroupChecked(childIdx: number): void
}
