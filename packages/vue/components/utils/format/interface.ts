export type IntersectionToObj<T> = {
  [P in keyof T]: T[P]
}

export type Tuple = <T extends string[]>(...rest: T) => T
