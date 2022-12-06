/**
 * in future version we will discard and remove createNameSpace .
 * So , use createName instance of createNameSpace
 *
 *  the vue3 style see : https://v3.vuejs.org/style-guide/#priority-a-essential
 */

import { camelize } from '../format/string'

export const COMPONENT_PREFFIX_NAME = 'fe'

export const createName = (name: string) => {
  name = name.charAt(0).toLocaleLowerCase() + name.slice(1)
  return camelize(`-${COMPONENT_PREFFIX_NAME}-${name}`)
}
