import { createComponent } from './component'

const createNameSpace = (name) => {
  name = `fe-${name}`
  return [createComponent(name)]
}

export { createNameSpace }
