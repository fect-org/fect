import { genPackagesEntry } from '../compiler/collect'

export const collect = async () => {
  await genPackagesEntry()
}
