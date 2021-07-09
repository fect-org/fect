import { createComponent } from './component'

const createNameSpace = (name: string) => {
  const declareName = `fe-${name.toLocaleLowerCase()}`
  return [createComponent(declareName)]
}

export { createNameSpace }
