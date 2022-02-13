/***
 * docs: http://getbem.com/naming/
 * block
 * element
 * modifier
 */

export type Mod = string | Record<string, string | boolean>
export type Mods = Mod | Mod[]

const parserBem = (el: string, mods?: Mods): string => {
  if (!mods) return ''
  if (typeof mods === 'string') return ' ' + `${el}--${mods}`
  if (Array.isArray(mods)) {
    return mods.reduce<string>((acc, cur) => acc + parserBem(el, cur), '')
  }
  return Object.keys(mods).reduce((acc, cur) => {
    const bool = typeof mods[cur] === 'boolean'
    const modifier = bool && mods[cur] ? cur : (mods[cur] as string)
    return acc + parserBem(el, modifier)
  }, '')
}

export const createBem = (base: string) => {
  return (el?: string | null, mods?: Mods) => {
    el = el ? `${base}__${el}` : base
    return el + parserBem(el, mods)
  }
}
