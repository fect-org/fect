import { createComponent } from './component'

const createNameSpace = (name: string) => {
  const declareName = `fe-${name}`
  return [createComponent(declareName)]
}

export { createNameSpace }
