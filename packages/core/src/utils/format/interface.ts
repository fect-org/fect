export type RecordPartial<T extends keyof any, K> = {
  [P in T]?: K
}
