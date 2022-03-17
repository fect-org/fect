const typingStr = `
import { StaticModalOptions } from './modal/interface'
import { ToastOptions, StaticToastOptions } from './toast/interface'

interface StaticToastMethods {
  success: (options: StaticToastOptions) => void
  warning: (options: StaticToastOptions) => void
  error: (options: StaticToastOptions) => void
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: Pick<StaticToastMethods, keyof StaticToastMethods> & ((options: ToastOptions) => void)
    $modal: (options: StaticModalOptions) => void
  }
}`

const fs = require('fs')

const path = require('path')

;(() => {
  const entry = path.join(__dirname, 'types', 'index.d.ts')
  try {
    const res = fs.readFileSync(entry, 'utf-8')
    const out = res + typingStr
    fs.writeFile(entry, out, (err) => {
      if (err) console.log(err)
    })
  } catch (error) {
    throw error
  }
})()
