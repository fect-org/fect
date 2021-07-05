import { Ref } from 'vue'

export const READONLY_DOCS_CODESHOW_KEY = 'codeShowKey'

export type CodeShowProvide = {
  title: string
  desc: string
  name: string
  code: Ref<string>
  setpreViewCode: (val: string) => void
}
