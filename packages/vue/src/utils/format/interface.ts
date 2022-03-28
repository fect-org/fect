export type IntersectionToObj<T> = {
  [P in keyof T]: T[P]
}

export type RecordPartial<T extends keyof any, K> = {
  [P in T]?: K
}
