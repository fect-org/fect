export type IntersectionToObj<T> = {
  [P in keyof T]: T[P]
}
