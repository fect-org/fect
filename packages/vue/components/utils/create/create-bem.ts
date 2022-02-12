/***
 * docs: http://getbem.com/naming/
 * block
 * element
 * modifier
 */

export type Mod = string | Record<string, boolean>
export type Mods = Mod | Mod[]

const parserBem = (el: string, mods?: Mods): string => {
  if (!mods) return el
  if (typeof mods === 'string') return `${el}--${mods}`
  if (Array.isArray(mods)) {
    return mods.reduce<string>((acc, cur) => acc + parserBem(el, cur), '')
  }
  return Object.keys(mods).reduce((acc, cur) => {
    return acc + Boolean(mods[cur]) ? parserBem(el, cur) : ''
  }, '')
}

export const createBem = (base: string) => {
  return (el?: string | null, mods?: Mods) => {
    el = el ? `${base}__${el}` : base
    return parserBem(el, mods)
  }
}
