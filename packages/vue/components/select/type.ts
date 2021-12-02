export const READONLY_SELECT_KEY = 'selectKey'

export interface SelectProvide {
  setVisible: (status: boolean) => void
  setParentValue: (val: string) => void
}

export interface SizeStyle {
  height: string
  fontSize: string
  minWidth: string
}
