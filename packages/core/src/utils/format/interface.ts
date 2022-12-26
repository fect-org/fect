export type RecordPartial<T extends keyof any, K> = {
  [P in T]?: K
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, any> ? DeepPartial<T[P]> : T[P]
}
