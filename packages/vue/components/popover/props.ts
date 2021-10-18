import { props as tooltipProps } from '../tooltip/props'

export const omit = <T extends Object, K extends (string | number | symbol)[]>(
  source: T,
  ...exclude: K
): Pick<T, Exclude<keyof T, K[number]>> =>
  Object.keys(source).reduce(
    (acc, cur) => (exclude.includes(cur) ? acc : { ...acc, [cur]: source[cur as never] }),
    {} as T
  )

export const props = omit(tooltipProps, 'content')
