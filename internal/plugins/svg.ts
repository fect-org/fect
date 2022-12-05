import type { CustomPlugin } from 'svgo'

export const svg: CustomPlugin = {
  name: 'sterilization',
  fn(root, params) {
    return {
      element: {
        enter: (node) => {
          //
        }
      }
    }
  }
}
