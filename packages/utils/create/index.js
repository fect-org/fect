import { createComponent } from './component'

const createNameSpace = (name) => {
  name = `fay-${name}`
  return [createComponent(name)]
}

export { createNameSpace }
