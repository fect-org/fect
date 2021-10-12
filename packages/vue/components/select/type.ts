export const READONLY_SELECT_KEY = 'selectKey'

export type SelectProvide = {
  setVisible: (status: boolean) => void
  setParentValue: (val: string) => void
}

export type SizeStyle = {
  height: string
  fontSize: string
  minWidth: string
}
