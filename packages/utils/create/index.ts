import { createComponent } from './component'
import { createName } from './createName'

const createNameSpace = (name: string) => {
  const declareName = `fe-${name.charAt(0).toLocaleLowerCase() + name.slice(1)}`
  return [createComponent(declareName)]
}

export { createNameSpace, createName }
