import { createComponent } from './component'

const createNameSpace = (name) => {
  name = `fect-${name}`
  return [createComponent(name)]
}

export { createNameSpace }
